import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var userData = {
    email: "",
    password: ""
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    log: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function LogIn() {
    const classes = useStyles();
    let history = useHistory();

    // Update user data from input fields
    function handleChange(e) {
        const dataField = [e.target.name]
        userData[dataField] = e.target.value
    }

    function onClickLogIn(e) {
        e.preventDefault();
        console.log("Login clicked...", userData);

        if (!checkEmptyFields()) setOpen(true);

        Axios.post('https://fastmedexp.herokuapp.com/api/login', userData)
            .then((response) => {
                console.log("Post succesful", response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                localStorage.setItem("id", response.data.id);
                if (response.data.type === 'Doctor') {
                    history.push("/", { succes: "Logged in successfully" });
                    window.location.reload();
                }
                else {
                    history.push("/paciente", { succes: "Logged in successfully" });
                    window.location.reload();
                }
            })
            .catch((err) => {
                setOpen(true);
            });
    }

    function pushRegister() {
        history.push("/register");
    }

    function checkEmptyFields() {
        var valid = true
        for (let [key, value] of Object.entries(userData)) {
            if (value === "") valid = false;
        }
        return valid;
    }

    //Knackbar
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <div className={classes.log}>
                <h1>Login</h1>
            </div>

            <div className="login-form">

                <form id="login-form">
                    <TextField id="filled-basic" label="Email" variant="filled" className="login-field" name="email" onChange={handleChange} />
                    <br />
                    <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field" name="password" type="password" onChange={handleChange} />
                    <br /> <br />
                    <Button variant="contained" color="primary" className="login-button" onClick={onClickLogIn}>Entrar</Button>
                    <Button color="primary" className="login-button" onClick={pushRegister}>Nuevo usuario</Button>
                </form>
            </div>
            <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">Correo o contraseña incorrectos</Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default LogIn;