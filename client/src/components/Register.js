import React from 'react'
import { Button, TextField } from '@material-ui/core';

function Register() {
    return (
        <div>
            <h1>Register page</h1>
            <div className="register-form">
                <form id="register-form">
                    <TextField id="filled-basic" label="Nombre" variant="filled" className="login-field" />
                    <TextField id="filled-basic" label="Apellidos" variant="filled" className="login-field" />
                    <br />
                    <TextField id="filled-basic" label="E-mail" variant="filled" className="login-field" />
                    <br />
                    <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field"/>
                    <TextField id="filled-basic" label="Confirmar contraseña" variant="filled" className="login-field" />
                    <br /><br />
                    <Button variant="contained" color="primary" className="login-button">Registrar</Button>
                </form>
            </div>
        </div>
    )
}

export default Register;