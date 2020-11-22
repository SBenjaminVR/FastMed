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
      sintomas: "",
      motivoCita: "",
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
    console.log(data);
  }

  const sendPostRequest = async () => {
    console.log("VOY A MANDAR");
    console.log(data.form);
    try {
      const resp = await axios.post(`https://fastmedexp.herokuapp.com/api/citas/doctor/${DOC}`, data.form);
      console.log(resp.data);
      history.push("/", {succes: "Cita succesfully submitted."});
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

  const fetchPacientes = async () => {
    const {data } = await axios.get(`https://fastmedexp.herokuapp.com/api/pacientes`); 
    return data.data;
  }
  
  return(
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" align="center" style={{marginBottom: 16}}>
            Crear una cita nueva
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
              {state.pacientes.map(paciente => (<option value= {paciente._id}>{`${paciente.nombre} ${paciente.apellidos}`}</option>))}
            </Select>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h5" align="left" style={{marginBottom: 8}}>
            Motivo de cita
            </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                name="motivoCita"
                onChange={handleConsulta}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h5" align="left" style={{marginBottom: 8}}>
                Síntomas
            </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                name="sintomas"
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