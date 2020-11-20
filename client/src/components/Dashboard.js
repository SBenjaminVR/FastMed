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
import axios from 'axios'

const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const convertirFecha = (fechaNativa) => {
    let fechaNueva = new Date(fechaNativa);
    let minutes = fechaNueva.getMinutes() < 10 ? '00' : fechaNueva.getMinutes();
    return `${dias[fechaNueva.getDay()]} ${fechaNueva.getDate()} de ${meses[fechaNueva.getMonth()]} ${fechaNueva.getHours()}:${minutes}`
}

const fetchPacientes = async () => {
    const { data } = await axios.get(`http://127.0.0.1:4000/api/pacientes/doctor/5fb18ebbaac5d00878fa63ea`); 
    return data;
}

const fetchConsultas = async () => {
    const { data } = await axios.get(`http://127.0.0.1:4000/api/consultas/doctor/5fb18ebbaac5d00878fa63ea`);
    return data;
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
    const [state, setState] = useState({
        consultasData: [], loading: false, pacientesData: []
    })
    
    useEffect(() => {
        const fetchData = async () => {
            const pacientes = await fetchPacientes();
            console.log(pacientes.data);
            const consultas = await fetchConsultas();
            console.log(consultas.data)
            /*
            for (let i = 0; i < citasData.length; i++) {
                let fechaNueva = convertirFecha(citasData[i].fecha)
                citasData[i]['fecha'] = fechaNueva;
            }
            */
        
            setState((prevState) => ({...prevState, pacientesData: pacientes.data.pacientes}))
            setState((prevState) => ({...prevState, consultasData: consultas.data.consultas}))
        }
    fetchData();
    }, [])
    console.log(state);
    const classes = useStyles();
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
                            <Fab size="small" color="secondary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </div>
                    </div>
                    <h3 className={classes.cardCategoryWhite}>Datos de Paciente - Fecha y Hora</h3>
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
                                        />
                                    </div>
                                    <Fab size="small" color="secondary" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Nombre", "Apellidos", "Antecedentes Médicos", "Médicamentos de uso diario"]}
                                tableData={[
                                    ["Jonathan", "López Favela", "Diabetes", "Insulina"],
                                    ["Salvador", "Ayala Cardenas", "Fractura de tobillo", "-"],
                                    ["Enrique", "Montemayor", "Fractura de meñique", "-"],
                                    ["Laura", "Salinas Arroyo", "-", "-"],
                                    ["Micaela", "Castro Flores", "Golpe en rodilla", "Anti-inflamatorio"],
                                    ["Beatriz", "Espinoza Sanchez", "Fractura de brazo izquierdo", "Cataflam"],
                                ]}
                            />

                        </CardBody>
                        <div style={{ margin: "auto" }}>
                            <Pagination count={10} color="secondary" />
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
                                        />
                                    </div>
                                    <Fab size="small" color="secondary" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Nombre", "Apellidos", "Fecha", "Hora"]}
                                tableData={[
                                    ["Axel", "Hernandez Rodríguez", "Martes 24 de Noviembre", "4:00 PM"],
                                    ["Lorena", "Pérez Rodríguez", "Martes 24 de Noviembre", "4:30 PM"],
                                    ["Martin", "González Martinez", "Martes 24 de Noviembre", "5:00 PM"],
                                    ["Sofía", "Chavez Díaz", "Martes 24 de Noviembre", "5:30 PM"],
                                    ["Mónica", "Gutierrez Serna", "Martes 24 de Noviembre", "6:00 PM"],
                                    ["Enrique", "Montemayor", "Miercoles 25 de Noviembre", "4:30 PM"]
                                ]}
                            />

                        </CardBody>
                        <div style={{ margin: "auto" }}>
                            <Pagination count={2} color="secondary" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
