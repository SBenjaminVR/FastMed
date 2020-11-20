import React from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Axios from 'axios';

var userData = {
    userType: "",
    registerInfo: {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        re_password: ""
    }
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
                    <TextField id="filled-basic" label="Nombre" variant="filled" className="login-field" name="nombre" onChange={handleChange} />
                    <TextField id="filled-basic" label="Apellidos" variant="filled" className="login-field" name="apellidos" onChange={handleChange}/>
                    <br />
                    <TextField id="filled-basic" label="E-mail" variant="filled" className="login-field" name="email" onChange={handleChange} />
                    <br />
                    <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field" name="password" onChange={handleChange} />
                    <TextField id="filled-basic" label="Confirmar contraseña" variant="filled" className="login-field" name="re_password" onChange={handleChange} />
                    <RadioGroup aria-label="userType" name="userType1" defaultValue="users" onChange={handleRadioChange} style={{marginLeft: "15px"}}>
                        <FormControlLabel value="users" control={<Radio />} label="Paciente" />
                        <FormControlLabel value="doctors" control={<Radio />} label="Doctor" />
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
    userData.registerInfo[dataField] = e.target.value
}

function onClick(e) {
    e.preventDefault();
    console.log("Register clicked...");
    
    if (!checkEmptyFields()) console.log("Empty fields"); // change for alert
    if (!checkEqualPasswords()) console.log("Not same passwords"); // change for alert
    let filteredData = userData.registerInfo;
    delete filteredData.re_password;
    console.log("Register data:", filteredData);
    
    Axios.post('https://fastmedexp.herokuapp.com/api/' + userData.userType + '/signup', filteredData)
    .then((response) => {
        console.log("Post succesful", response);
    })
    .catch((err) => {
        console.log("Post unsuccesful", err);
    });
}

function checkEmptyFields() {
    var valid = true
    for (let [key, value] of Object.entries(userData.registerInfo)) {
        if (value === "") valid = false;
    }
    return valid;
}

function checkEqualPasswords() {
    return userData.registerInfo["password"] === userData.registerInfo["re_password"];
}

export default Register;