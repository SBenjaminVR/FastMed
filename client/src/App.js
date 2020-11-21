import logo from './logo.svg';
import './App.css';
import React from "react";
import Dashboard from "./components/Dashboard"
import Bot from "./components/Bot"
import Navbar from './components/Navbar'
import LogIn from './components/LogIn'
import Register from './components/Register'
import CitaPaciente from './components/citas_paciente'
import CitaDoctor from './components/citas_doctor'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PrivateRoute from './components/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#35a8a4',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fb7867',
      main: '#fa5741',
      dark: '#af3c2d',
      contrastText: '#fff',
    },
    medicRed: {
      main: '#fa5741',
      contrastText: '#fff',
    }
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div style={{ margin: "3%" }}>

        </div>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute path="/users" component={Users} />
            <PrivateRoute path="/doctor" component={CitaDoctor} />
            <PrivateRoute path="/bot" component={Bot} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}


export default App;
