import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  let history = useHistory();
  const _logout = _ => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("id");
    history.push("/", { succes: "Logout successfully" });
    window.location.reload();
  }

  const _Dashboard = _ => {
    history.push("/");
  }

  const _CitasDoctor = _ => {
    history.push("/doctor")
  }

  const _CitasPaciente = _ => {
    history.push("/paciente")
  }

  const _Bot = _ => {
    history.push("/bot")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FastMed
          </Typography>
          {localStorage.getItem('token')
            ? localStorage.getItem('type') === 'Doctor'
              ? <div>
                <Button color="inherit" onClick={_Dashboard}>Dashboard</Button>
                <Button color="inherit" onClick={_CitasDoctor}>Citas</Button>
                <Button color="inherit" onClick={_logout}>Logout</Button>
              </div>
              : <div>
                <Button color="inherit" onClick={_CitasPaciente}>Citas</Button>
                <Button color="inherit" onClick={_Bot}>Bot</Button>
                <Button color="inherit" onClick={_logout}>Logout</Button>
              </div>
            : <div></div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar