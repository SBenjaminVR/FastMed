import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from './Table'
import Card from './Card/Card'
import CardBody from './Card/CardBody'
import CardHeader from './Card/CardHeader'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const REGISTROS_POR_PAGINA = 5;
const DOC = localStorage.getItem('id');

const convertirFecha = (fechaNativa) => {
    let fechaNueva = new Date(fechaNativa);
    return `${dias[fechaNueva.getDay()]} ${fechaNueva.getDate()} de ${meses[fechaNueva.getMonth()]}`
}

const convertirHora = (fechaNativa) => {
    let fechaNueva = new Date(fechaNativa);
    let minutes = fechaNueva.getMinutes() < 10 ? '00' : fechaNueva.getMinutes();
    return `${fechaNueva.getHours()}:${minutes}`
}

const fetchPacientes = async () => {
    const { data } = await axios.get(`https://fastmedexp.herokuapp.com/api/pacientes/doctor/${DOC}`);
    return data;
}

const fetchConsultas = async () => {
    const { data } = await axios.get(`https://fastmedexp.herokuapp.com/api/consultas/doctor/${DOC}`);
    return data;
}

const fetchCitas = async () => {
    const { data }  = await axios.get(`https://fastmedexp.herokuapp.com/api/citas/doctor/proxima/${DOC}`);
    return data;
}

const formatearPacientes = async (pacientes) => {

    let data = [];
    for (let paciente of pacientes) {

        let historial = paciente.historialMedicoRelevante;
        let tablerow = [];
        tablerow.push(paciente.nombre);
        tablerow.push(paciente.apellidos);
        historial.antecedentesMedicos ? tablerow.push(historial.antecedentesMedicos) : tablerow.push("-");
        historial.medicamenteUsoDiario ? tablerow.push(historial.medicamenteUsoDiario) : tablerow.push("-");
        tablerow.push(paciente._id);
        data.push(tablerow);
    }

    return data;
}

const formatearConsultas = async (consultas) => {

    let data = [];
    for (let consulta of consultas) {

        let tablerow = [];
        tablerow.push(consulta.NombrePaciente);
        tablerow.push(consulta.ApellidoPaciente);
        tablerow.push(convertirFecha(consulta.fecha))
        tablerow.push(convertirHora(consulta.fecha))
        tablerow.push(consulta._id)
        data.push(tablerow);
    }

    return data;
}

const searchRegex = (input, elementos) => {
    input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let regex = new RegExp(input, 'i');
    let filtrados = [];
        for (let pac of elementos) {
            for (let i = 0; i < 4; i++) {
                pac[i] = pac[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (regex.test(pac[i])) {
                    filtrados.push(pac);
                    break;
                }
            }
        }
    return filtrados;
}

const cortarDatos = (tabla, value) => {
    return tabla.slice(REGISTROS_POR_PAGINA*value-REGISTROS_POR_PAGINA, REGISTROS_POR_PAGINA*value);
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    }
}));

function Dashboard() {
    let history = useHistory();
    const _Expediente = _ => { history.push("/expediente"); window.location.reload();}
    const _Consultas = _ => { history.push("/consulta"); window.location.reload(); }
    const _Citas = _ => { history.push("/crearCita"); window.location.reload(); }

    const [state, setState] = useState({
        loading: true, 
        pacientes: [], 
        consultas: [], 
        t1DataF: [], 
        t2DataF: [], 
        t1Data: [], 
        t2Data: [], 
        t1count: 1,
        t2count: 1,
        pag1: 1, 
        pag2: 1,
        citaHoy: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const pacientes = await fetchPacientes();
            const consultas = await fetchConsultas();
            const citas = await fetchCitas();

            let citasDeHoy = citas.payload.citasData, text = "No hay citas programadas para hoy";
            if (citasDeHoy.length) {
                text = `${citasDeHoy[0].NombrePaciente} - ${convertirFecha(citasDeHoy[0].fecha)} ${convertirHora(citasDeHoy[0].fecha)}`
            }

            const table1Data = await formatearPacientes(pacientes.data.pacientes);
            const table2Data = await formatearConsultas(consultas.data.consultas);

            setState((prevState) => ({ ...prevState, 
                pacientes: table1Data, 
                consultas: table2Data, 
                loading: false,
                t1Data: cortarDatos(table1Data, 1),
                t2Data: cortarDatos(table2Data, 1),
                t1DataF: table1Data,
                t2DataF: table2Data,
                t1count: Math.ceil(table1Data.length / REGISTROS_POR_PAGINA),
                t2count: Math.ceil(table2Data.length / REGISTROS_POR_PAGINA),
                citaHoy: text
            }))
        }
        fetchData();
    }, [])
    console.log(state);
    const classes = useStyles();

    const searchBar1OnChange = (event) => {
        if (event.target.value !== '') {
            let datos = searchRegex(event.target.value, state.pacientes)
            setState((prevState) => ({ ...prevState, 
                t1Data: cortarDatos(datos, 1), 
                t1DataF: datos,
                t1count: Math.ceil(datos.length / REGISTROS_POR_PAGINA),
                pag1: 1
            }))
        }
        else {
            setState((prevState) => ({ ...prevState, 
                t1Data: cortarDatos(state.pacientes, 1),
                t1DataF: state.pacientes,
                t1count: Math.ceil(state.pacientes.length / REGISTROS_POR_PAGINA),
                pag1: 1
            }))
        }
    }

    const searchBar2OnChange = (event) => {
        if (event.target.value !== '') {
            let datos = searchRegex(event.target.value, state.consultas)
            setState((prevState) => ({ ...prevState, 
                t2Data: cortarDatos(datos, 1),
                t2DataF: datos,
                t2count: Math.ceil(datos.length / REGISTROS_POR_PAGINA),
                pag2: 1
            }))
        }
        else {
            setState((prevState) => ({ ...prevState, 
                t2Data: cortarDatos(state.consultas, 1), 
                t2DataF: state.consultas,
                t2count: Math.ceil(state.consultas.length / REGISTROS_POR_PAGINA),
                pag2: 1
            }))
        }
    }

    const cambiarPaginaT1 = (event, value) => {
        let datosCortados = cortarDatos(state.t1DataF, value);
        setState((prevState) => ({ ...prevState, t1Data: datosCortados, pag1: value }))
    };

    const cambiarPaginaT2 = (event, value) => {
        let datosCortados = cortarDatos(state.t2DataF, value);
        setState((prevState) => ({ ...prevState, t2Data: datosCortados, pag2: value }))
    };

    return (
        <div>
            <div>
                <CardHeader color="medic">
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}>
                            <h2 className={classes.cardTitleWhite} style={{ alignItems: "flex-start" }}>Próxima cita de hoy</h2>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            textAlign: "right",
                        }}>
                            <Fab size="small" color="secondary" aria-label="add" onClick={_Citas}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                    <h3 className={classes.cardCategoryWhite}>{state.citaHoy}</h3>
                </CardHeader>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                    <Card>
                        <CardHeader color="medic">
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                }}>
                                    <h2 className={classes.cardTitleWhite} style={{ alignItems: "flex-start" }}>Pacientes</h2>
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    textAlign: "right",
                                }}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Buscar..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'Buscar' }}
                                            onChange={searchBar1OnChange}
                                        />
                                    </div>
                                    <Fab size="small" color="secondary" aria-label="add" onClick={_Expediente}>
                                        <AddIcon />
                                    </Fab>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {state.loading
                                ? <CircularProgress />
                                : <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Nombre", "Apellidos", "Antecedentes Médicos", "Médicamentos de uso diario"]}
                                    tableData={state.t1Data || []}
                                    tableType="expediente"
                                />
                            }
                        </CardBody>
                        <div style={{ margin: "auto" }}>
                            <Pagination count={state.t1count} page={state.pag1} onChange={cambiarPaginaT1} color="secondary" />
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader color="medic">
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                }}>
                                    <h2 className={classes.cardTitleWhite} style={{ alignItems: "flex-start" }}>Consultas</h2>
                                </div>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    textAlign: "right",
                                }}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Buscar..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'Buscar' }}
                                            onChange={searchBar2OnChange}
                                        />
                                    </div>
                                    <Fab size="small" color="secondary" aria-label="add" onClick={_Consultas}>
                                        <AddIcon />
                                    </Fab>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {state.loading
                                ? <CircularProgress />
                                : <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Nombre", "Apellidos", "Fecha", "Hora"]}
                                    tableData={state.t2Data || []}
                                    tableType="consulta"
                                />}
                        </CardBody>
                        <div style={{ margin: "auto" }}>
                            <Pagination count={state.t2count} page={state.pag2} onChange={cambiarPaginaT2} color="secondary" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
