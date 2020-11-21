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
                <Button color="inherit" onClick={_logout}>Dashboard</Button>
                <Button color="inherit" onClick={_logout}>Citas</Button>
                <Button color="inherit" onClick={_logout}>Logout</Button>
              </div>
              : <div>
                <Button color="inherit" onClick={_logout}>Bot</Button>
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