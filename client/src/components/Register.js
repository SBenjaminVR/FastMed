import React from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Acios from 'axios';
import Axios from 'axios';

var userData = {
    firstName: "",
    lastNames: "",
    email: "",
    password: "",
    re_password: "",
    userType: ""
}

function Register() {
    const [value, setValue] = React.useState('paciente');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        userData.userType = event.target.value;
    };

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
                    <TextField id="filled-basic" label="Confirmar contraseña" variant="filled" className="login-field" name="re_password" onChange={handleChange} />
                    <RadioGroup aria-label="userType" name="userType1" defaultValue="paciente" onChange={handleRadioChange} style={{marginLeft: "15px"}}>
                        <FormControlLabel value="paciente" control={<Radio />} label="Paciente" />
                        <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
                    </RadioGroup>
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
    // create new user
    // confirm
    Axios.get('http://127.0.0.1:4000/api/users')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
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