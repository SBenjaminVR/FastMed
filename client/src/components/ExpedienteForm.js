import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {Grid, TextField, Typography,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { set } from 'mongoose';
import { useHistory } from 'react-router-dom';

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

const UserId = localStorage.getItem('id');

  const initialState = {
    loading: false,
    error: "",
    data: [],
    form: {
      nombre:"",
      apellidos:"",
      direccion: {
        calle: "",
        numero:0,
        colonia:"",
        codigoPostal:0,
        ciudad:"",
        estado:""
      },
      telefono: "",
      datosFiscales: {
        razonSocial:"",
        rfc:"",
        direccion: {
          calle: "",
          numero:0,
          colonia:"",
          codigoPostal:0,
          ciudad:"",
          estado:""
        },
        email:""
      },
      historialMedicoRelevante: {
        antecedentesMedicos: "",
        medicamenteUsoDiario: ""
      },
      doctor: UserId
    }
  };

function ExpedienteForm() {
  const [data, setData] = useState(initialState);
  const classes = useStyles();
  const axios = require('axios');
  let history = useHistory();

  function handleDatosPersonales(e) {
    const dataField = [e.target.name];
    data.form[dataField] = e.target.value;
  }

  function handleDatosPersonalesDireccion(e) {
    const dataField = [e.target.name];
    data.form.direccion[dataField] = e.target.value;
  }

  function handleDatosFiscales(e) {
    const dataField = [e.target.name];
    data.form.datosFiscales[dataField] = e.target.value;
  }

  function handleDatosFiscalesDireccion(e) {
    const dataField = [e.target.name];
    data.form.datosFiscales.direccion[dataField] = e.target.value;
  }

  function handleHistorialMedicoRelevante(e) {
    const dataField = [e.target.name];
    data.form.historialMedicoRelevante[dataField] = e.target.value;
  }

  const sendPostRequest = async () => {
    try {
      const resp = await axios.post('https://fastmedexp.herokuapp.com/api/pacientes', data.form);
      console.log(resp.data);
      history.push("/", {succes: "Paciente form succesfully submitted."});
    } catch (err) {
      console.error(err.response);
    }
  };

  function handlePost(e) {
    e.preventDefault();
    console.log(data.form);
    sendPostRequest();
  }

  return(
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" align="center" style={{marginBottom: 16}}>
            Datos Personales
        </Typography>

        <form onSubmit={handlePost}>
          <Grid container spacing={2} style={{marginBottom: 16}}>
            <Grid item xs={12} sm={6}>
              <TextField required variant = "outlined" type="text" label="Nombre" name="nombre" onChange={handleDatosPersonales} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField required item xs={12} sm={6} variant = "outlined" type="text" label="Apellidos" name="apellidos" onChange={handleDatosPersonales} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField variant = "outlined" type="text" label="Calle" name="Calle"  onChange={handleDatosPersonalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Número" name="numero" onChange={handleDatosPersonalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Código postal" name="codigoPostal" onChange={handleDatosPersonalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField variant = "outlined" type="text" label="Colonia" name="colonia" onChange={handleDatosPersonalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Ciudad" name="ciudad" onChange={handleDatosPersonalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Estado" name="estado" onChange={handleDatosPersonalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField required variant = "outlined" type="text" label="Teléfono" name="telefono" onChange={handleDatosPersonales} fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{marginBottom: 16}}>
            <Grid item xs={12} sm={12}>
              <Divider variant="middle" />
              <Typography component="h2" variant="h4" align="center" style={{marginTop: 16}}>
                Datos Físcales
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField variant = "outlined" type="text" label="Razon social" name="razonSocial" onChange={handleDatosFiscales} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField  item xs={12} sm={6} variant = "outlined" type="text" label="RFC" name="rfc" onChange={handleDatosFiscales} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField variant = "outlined" type="text" label="Calle" name="calle" onChange={handleDatosFiscalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Número" name="numero" onChange={handleDatosFiscalesDireccion}  fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Código postal" name="codigoPostal" onChange={handleDatosFiscalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField variant = "outlined" type="text" label="Colonia" name="colonia" onChange={handleDatosFiscalesDireccion}  fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Ciudad" name="ciudad" onChange={handleDatosFiscalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField variant = "outlined" type="text" label="Estado" name="estado" onChange={handleDatosFiscalesDireccion} fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField variant = "outlined" type="text" label="Email" name="email" onChange={handleDatosFiscales} fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h5" align="left" style={{marginBottom: 8}}>
              Antecedentes Médicos
            </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                name="antecedentesMedicos"
                onChange={handleHistorialMedicoRelevante}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
            <Typography component="h2" variant="h5" align="left" style={{marginBottom: 8}}>
                Medicamentos de uso diario
            </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                variant="outlined"
                name="medicamenteUsoDiario"
                onChange={handleHistorialMedicoRelevante}
                fullWidth
              />
            </Grid>        
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button 
              style={{marginTop: 16}} 
              type="submit" 
              variant="contained" 
              color="primary" 
              className="login-button" 
              onClick={handlePost}>Submit</Button>   
          </Grid>
        </form>
      </Paper>
    </main>     
  );
}

export default ExpedienteForm;