import React from 'react'
import { Button, TextField } from '@material-ui/core';

var userData = {
    firstName: "",
    lastNames: "",
    email: "",
    password: "",
    re_password: ""
}

function Register() {
    return (
        <div>
            <h1>Register page</h1>
            <div className="register-form">
                <form id="register-form">
                    <TextField id="filled-basic" label="Nombre" variant="filled" className="login-field" name="firstName" onChange={handleChange} />
                    <TextField id="filled-basic" label="Apellidos" variant="filled" className="login-field" name="lastNames" onChange={handleChange}/>
                    <br />
                    <TextField id="filled-basic" label="E-mail" variant="filled" className="login-field" name="email" onChange={handleChange} />
                    <br />
                    <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field" name="password" onChange={handleChange} />
                    <TextField id="filled-basic" label="Confirmar contraseña" variant="filled" className="login-field" name="re_password" onChange={handleChange}/>
                    <br /><br />
                    <Button type="submit" variant="contained" color="primary" className="login-button" onClick={onClick}>Registrar</Button>
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

function onClick(e) {
    e.preventDefault();
    console.log("Register clicked...");
    
    if (!checkEmptyFields()) console.log("Empty fields"); // change for alert
    if (!checkEqualPasswords()) console.log("No same passwords"); // change for alert

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

function checkEqualPasswords() {
    return userData["password"] === userData["re_password"];
}

export default Register;