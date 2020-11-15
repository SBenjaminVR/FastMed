import React from 'react'

function Register() {
    return (
        <div>
            <h1>Register page</h1>
            <form id="register-form">
                <h4>Username:</h4>
                <input type="text" id="user-id" name="user-id" />
                <h4>Password:</h4>
                <input type="text" id="user-password" name="user-password" />
                <h4>Confirm password:</h4>
                <input type="text" id="user-password" name="user-password" />
                <br /><br />
                <button>Registrar</button>
            </form>
        </div>
    )
}

export default Register;