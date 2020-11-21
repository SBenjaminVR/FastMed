import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

var userData = {
    email: "",
    password: ""
}

function LogIn() {
    let history = useHistory();

        // Update user data from input fields
    function handleChange(e) {
        const dataField = [e.target.name]
        userData[dataField] = e.target.value
    }

    function onClickLogIn(e) {
        e.preventDefault();
        console.log("Login clicked...", userData);
        
        if (!checkEmptyFields()) console.log("Empty fields"); // change for alert

        Axios.post('https://fastmedexp.herokuapp.com/api/login', userData)
        .then((response) => {
            console.log("Post succesful", response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", response.data.type);
            localStorage.setItem("id", response.data.id);
            history.push("/", {succes: "Logged in successfully"});
        })
        .catch((err) => {
            console.log("Post unsuccesful", err);
        });
    }

    function checkEmptyFields() {
        var valid = true
        for (let [key, value] of Object.entries(userData)) {
            if (value === "") valid = false;
        }
        return valid;
    }
    
    return (
        <div>
            <h1>Login</h1>
            <div className="login-form">
            <form id="login-form">
                <TextField id="filled-basic" label="Email" variant="filled" className="login-field" name="email" onChange={handleChange} />
                <br />
                <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field" name="password" type="password" onChange={handleChange} />
                <br /> <br />
                <Button variant="contained" color="primary" className="login-button" onClick={onClickLogIn}>Entrar</Button>
                <Button color="primary" className="login-button">Nuevo usuario</Button>
            </form>
        </div>
        </div>
    )
}

export default LogIn;