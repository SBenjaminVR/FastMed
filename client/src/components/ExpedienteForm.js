import React from "react";
import Paper from '@material-ui/core/Paper';
import {Grid, TextField, Typography} from '@material-ui/core'
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

function ExpedienteForm() {
  const classes = useStyles();
  const {register} = useForm();

  return(
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" align="center" style={{marginBottom: 16}}>
            Datos Personales
        </Typography>
        <Grid container spacing={2} style={{marginBottom: 16}}>
          <Grid item xs={12} sm={6}>
            <TextField required variant = "outlined" type="text" label="nombre" name="nombre" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
             <TextField required item xs={12} sm={6} variant = "outlined" type="text" label="apellido" name="apellido" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
              <TextField variant = "outlined" type="text" label="calle" name="calle" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="número" name="numero" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="código postal" name="cp" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField variant = "outlined" type="text" label="colonia" name="colonia" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="ciudad" name="ciudad" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="estado" name="estado" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField required variant = "outlined" type="text" label="teléfono" name="telefono" inputRef={register} fullWidth></TextField>
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
            <TextField variant = "outlined" type="text" label="Razon social" name="razonSocila" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
             <TextField  item xs={12} sm={6} variant = "outlined" type="text" label="RFC" name="rfc" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
              <TextField variant = "outlined" type="text" label="calle" name="calle" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="número" name="numero" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="código postal" name="cp" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField variant = "outlined" type="text" label="colonia" name="colonia" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="ciudad" name="ciudad" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField variant = "outlined" type="text" label="estado" name="estado" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField variant = "outlined" type="text" label="email" name="email" inputRef={register} fullWidth></TextField>
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
          <input  type="submit" style={{marginTop: 16}} />        
        </Grid>
      </Paper>
    </main>     
  );
}

export default ExpedienteForm;