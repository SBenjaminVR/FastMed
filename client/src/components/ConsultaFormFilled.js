import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Typography, Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(1) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    }
}));

function FormFilled(props) {
    const initialState = {
        existente: props.existente,
        error: "",
        data: [],
        form: props.form
    };
    const [data, setData] = useState(initialState);
    const classes = useStyles();
    let history = useHistory();

    function handleConsulta(e) {
        const dataField = [e.target.name];
        data.form[dataField] = e.target.value;
    }

    function handleConsultaExploracion(e) {
        const dataField = [e.target.name];
        data.form.exploracionFisica[dataField] = e.target.value;
    }

    const sendPostRequest = async () => {
        if (data.existente) {
            try {
                const resp = await axios.patch(`https://fastmedexp.herokuapp.com/api/consultas/${props.idPaciente}`, data.form);
                console.log(resp.data);
                history.push("/", { succes: "Consulta form succesfully edited." });
            } catch (err) {
                console.error(err);
            }
        }
        else {
            try {
                const resp = await axios.post('https://fastmedexp.herokuapp.com/api/consultas', data.form);
                console.log(resp.data);
                history.push("/", { succes: "Consulta form succesfully submitted." });
            } catch (err) {
                console.error(err);
            }
        }
    };

    function handlePost(e) {
        e.preventDefault();
        sendPostRequest();
    }

    const [state, setState] = useState({
        citas: [], loading: false, pacientes: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const { pacientes } = await fetchPacientes();
            setState((prevState) => ({ ...prevState, pacientes: pacientes }))
        }
        fetchData();
    }, [])

    const fetchPacientes = async () => {
        const { data } = await axios.get(`https://fastmedexp.herokuapp.com/api/pacientes`);
        return data.data;
    }

    console.log(data);
    const moment = require('moment');
    let nuevaFecha = new Date(data.form.fecha);
    nuevaFecha = moment(nuevaFecha).format('YYYY-MM-DDTHH:MM:SS');

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h2" variant="h4" align="center" style={{ marginBottom: 16 }}>
                    Consulta
        </Typography>

                <form onSubmit={handlePost}>
                    <Grid container spacing={2} style={{ marginBottom: 16 }}>

                        <Grid item xs={12} sm={12}>  
                            <Select
                                variant="outlined"
                                fullWidth
                                native
                                name="paciente"
                                onChange={handleConsulta}
                            >
                                <option label="-- Escoge un paciente --"></option>
                                {state.pacientes.map(paciente => (<option value={paciente._id}>{`${paciente.nombre} ${paciente.apellidos}`}</option>))}
                
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField variant="outlined" type="text" label="Motivo" name="motivoConsulta" onChange={handleConsulta} defaultValue={data.form.motivoConsulta} fullWidth></TextField>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField item xs={12} sm={12} variant="outlined" type="text" label="Evolución" name="evolucion" onChange={handleConsulta} defaultValue={data.form.evolucion} fullWidth></TextField>
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom: 16 }} justify="center">
                        <Grid item xs={12} sm={12}>
                            <Divider variant="middle" />
                            <Typography component="h2" variant="h4" align="center" style={{ marginTop: 16 }}>
                                Exploración Física
              </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField variant="outlined" type="number" label="Altura" name="altura" onChange={handleConsultaExploracion} defaultValue={data.form.exploracionFisica.altura} ></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField item xs={12} sm={6} variant="outlined" type="number" label="Peso" name="peso" onChange={handleConsultaExploracion} defaultValue={data.form.exploracionFisica.peso}></TextField>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField variant="outlined" type="number" label="IMC" name="imc" onChange={handleConsultaExploracion} defaultValue={data.form.exploracionFisica.imc}></TextField>
                        </Grid>
                    </Grid>

                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h2" variant="h5" align="left" style={{ marginBottom: 8 }}>
                                Observación
            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={5}
                                variant="outlined"
                                name="observacion"
                                onChange={handleConsultaExploracion}
                                fullWidth
                                defaultValue={data.form.exploracionFisica.observacion}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Typography component="h2" variant="h5" align="left" style={{ marginBottom: 8 }}>
                                Tratamiento
            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={5}
                                variant="outlined"
                                name="tratamiento"
                                onChange={handleConsulta}
                                fullWidth
                                defaultValue={data.form.tratamiento}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end"
                        style={{ marginTop: 38 }}
                    >
                        <TextField
                            required
                            label="Fecha"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="fecha"
                            onChange={handleConsulta}
                            style={{ marginRight: 32 }}
                            defaultValue={nuevaFecha}
                        />
                        <Button
                            style={{ marginTop: 16 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="login-button"
                            onClick={handlePost}
                        >Submit
            </Button>
                    </Grid>
                </form>
            </Paper>
        </main>
    );
}

export default FormFilled;