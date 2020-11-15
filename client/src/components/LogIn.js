import React from 'react'

function LogIn() {
    return (
        <div>
            <h1>LogIn page</h1>
            <form id="login-form">
                <h4>Username:</h4>
                <input type="text" id="user-id" name="user-id" />
                <h4>Password:</h4>
                <input type="text" id="user-password" name="user-password" />
                <br /> <br />
                <button>Log in</button><button>New user</button>
            </form>
        </div>
    )
}

export default LogIn;