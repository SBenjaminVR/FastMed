import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRouteD = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    localStorage.getItem('token') 
        ? localStorage.getItem('type') === 'Doctor'
            ? <Component {...props} />
            :  <Redirect to={{pathname: '/paciente', state: {error: `You don't have access to that part`}}} />
        : <Redirect to={{pathname: '/login', state: {error: 'You need to be logged in to access that'}}} />
  )}/>
);

export default PrivateRouteD;
