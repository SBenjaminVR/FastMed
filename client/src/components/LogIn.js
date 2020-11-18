import React from 'react'
import { Button, TextField } from '@material-ui/core';

var userData = {
    email: "",
    password: ""
}

function LogIn() {
    return (
        <div>
            <h1>LogIn page</h1>
            <div className="login-form">
            <form id="login-form">
                <TextField id="filled-basic" label="Email" variant="filled" className="login-field" name="email" onChange={handleChange} />
                <br />
                <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field" name="password" onChange={handleChange} />
                <br /> <br />
                <Button variant="contained" color="primary" className="login-button" onClick={onClickLogIn}>Entrar</Button>
                <Button color="primary" className="login-button">Nuevo usuario</Button>
            </form>
        </div>
        </div>
    )
}

// Update user data from input fields
function handleChange(e) {
    const dataField = [e.target.name]
    userData[dataField] = e.target.value
}

function onClickLogIn(e) {
    e.preventDefault();
    console.log("Login clicked...");
    
    if (!checkEmptyFields()) console.log("Empty fields"); // change for alert

    // Call to api
    // check if user already exists
    // create new user
    // confirm
}

function checkEmptyFields() {
    var valid = true
    for (let [key, value] of Object.entries(userData)) {
        if (value === "") valid = false;
    }
    return valid;
}

export default LogIn;