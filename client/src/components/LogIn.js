import React from 'react'
import { Button, TextField } from '@material-ui/core';

function LogIn() {
    return (
        <div>
            <h1>LogIn page</h1>
            <div className="login-form">
            <form id="login-form">
                <TextField id="filled-basic" label="Usuario" variant="filled" className="login-field" />
                <br />
                <TextField id="filled-basic" label="Contraseña" variant="filled" className="login-field"/>
                <br /> <br />
                <Button variant="contained" color="primary">Log in</Button>
                <Button color="primary">Nuevo usuario</Button>
            </form>
        </div>
        </div>
    )
}

export default LogIn;