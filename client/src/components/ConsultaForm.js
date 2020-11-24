import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Typography,Button} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import Select from '@material-ui/core/Select';

const DOC = localStorage.getItem('id');

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

  const initialState = {
    loading: false,
    error: "",
    data: [],
    form: {
      fecha:"",
      motivoConsulta: "",
      evolucion: "",
      exploracionFisica: {
        altura: 0,
        peso: 0,
        imc: 0,
        observacion: ""
      },
      tratamiento: "",
      doctor: DOC,
      paciente:""
    },
  };

function Form() {
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
    try {
      const resp = await axios.post('https://fastmedexp.herokuapp.com/api/consultas', data.form);
      console.log(resp.data);
      history.push("/", {succes: "Consulta form succesfully submitted."});
    } catch (err) {
      console.error(err);
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
        const {pacientes} = await fetchPacientes();  
        setState((prevState) => ({...prevState, pacientes: pacientes}))
    }
fetchData();
}, [])

  const pacientes = ["Uno","Dos","Tres"];

  const fetchPacientes = async () => {
    const {data } = await axios.get(`https://fastmedexp.herokuapp.com/api/pacientes`); 
    return data.data;
  }
  
  return(
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" align="center" style={{marginBottom: 16}}>
            Consulta
        </Typography>

        <form onSubmit={handlePost}>
          <Grid container spacing={2} style={{marginBottom: 16}}>

            <Grid item xs={12} sm={12}>
            <Select
              variant = "outlined"
              fullWidth
              native
              name="paciente"
              onChange={handleConsulta}
            >
              <option label="-- Escoge un paciente --"></option>
              {state.pacientes.map(paciente => (<option value= {paciente._id}>{`${paciente.nombre} ${paciente.apellidos}`}</option>))}
            </Select>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField variant = "outlined" type="text" label="Motivo" name="motivoConsulta" onChange={handleConsulta} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField  item xs={12} sm={12} variant = "outlined" type="text" label="Evolución"  name="evolucion" onChange={handleConsulta} fullWidth></TextField>
            </Grid>

          </Grid>

          <Grid container spacing={2} style={{marginBottom: 16}} justify="center">
            <Grid item xs={12} sm={12}>
              <Divider variant="middle" />
              <Typography component="h2" variant="h4" align="center" style={{marginTop: 16}}>
                Exploración Física
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField variant = "outlined" type="number" label="Altura" name="altura" onChange={handleConsultaExploracion}></TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField  item xs={12} sm={6} variant = "outlined" type="number" label="Peso" name="peso" onChange={handleConsultaExploracion}></TextField>
            </Grid>

            <Grid item xs={3}>
                <TextField variant = "outlined" type="number" label="IMC" name="imc" onChange={handleConsultaExploracion} ></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h5" align="left" style={{marginBottom: 8}}>
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
              />
            </Grid>

            <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h5" align="left" style={{marginBottom: 8}}>
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
              />
            </Grid>        
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            style={{marginTop: 38}}
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
              style={{marginRight: 32}}
            />
            <Button 
              style={{marginTop: 16}} 
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

export default Form;