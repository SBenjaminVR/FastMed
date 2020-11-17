import React from "react";
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

function Form() {
  const classes = useStyles();
  const {register} = useForm();
  
  return(
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" align="center" style={{marginBottom: 16}}>
            Consulta
        </Typography>
        <Grid container spacing={2} style={{marginBottom: 16}}>
          <Grid item xs={12} sm={12}>
            <TextField variant = "outlined" type="text" label="motivo" name="motivo" inputRef={register} fullWidth></TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
             <TextField  item xs={12} sm={12} variant = "outlined" type="text" label="evolución"  name="evolucion" inputRef={register} fullWidth></TextField>
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
            <TextField variant = "outlined" type="number" label="altura" name="altura" inputRef={register}></TextField>
          </Grid>

          <Grid item xs={3}>
             <TextField  item xs={12} sm={6} variant = "outlined" type="number" label="peso" name="peso" inputRef={register}></TextField>
          </Grid>

          <Grid item xs={3}>
              <TextField variant = "outlined" type="number" label="IMC" name="imc" inputRef={register} ></TextField>
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