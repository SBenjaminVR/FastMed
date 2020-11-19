import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";

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
      tratamiento: ""

    }
  };



function Form() {
  const [data, setData] = useState(initialState);
  const classes = useStyles();

  function handleConsulta(e) {
    const dataField = [e.target.name];
    data.form[dataField] = e.target.value;
  }

  function handleConsultaExploracion(e) {
    const dataField = [e.target.name];
    data.form.exploracionFisica[dataField] = e.target.value;
  }
  
  return(
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" align="center" style={{marginBottom: 16}}>
            Consulta
        </Typography>
        <Grid container spacing={2} style={{marginBottom: 16}}>
          <Grid item xs={12} sm={12}>
            <TextField variant = "outlined" type="text" label="motivo" name="motivoConsulta" onChange={handleConsulta} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
             <TextField  item xs={12} sm={12} variant = "outlined" type="text" label="evolución"  name="evolucion" onChange={handleConsulta} fullWidth></TextField>
          </Grid>

        </Grid>

        <Grid container spacing={2} style={{marginBottom: 16}} justify="center">
          <Grid item xs={12} sm={12}>
            <Divider variant="middle" />
            <Typography component="h2" variant="h4" align="center" style={{marginTop: 16}}>
              Explorarción Física
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField variant = "outlined" type="number" label="altura" name="altura" onChange={handleConsultaExploracion}></TextField>
          </Grid>

          <Grid item xs={3}>
             <TextField  item xs={12} sm={6} variant = "outlined" type="number" label="peso" name="peso" onChange={handleConsultaExploracion}></TextField>
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
          <form className={classes.container} noValidate>
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
          </form>
          <input  type="submit" />
          
        </Grid>
      </Paper>
    </main>     
  );
}

export default Form;