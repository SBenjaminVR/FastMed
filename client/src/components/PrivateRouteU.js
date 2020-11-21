import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRouteU = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    localStorage.getItem('token') 
        ? localStorage.getItem('type') === 'Usuario'
            ? <Component {...props} />
            :  <Redirect to={{pathname: '/', state: {error: `You don't have access to that part`}}} />
        : <Redirect to={{pathname: '/login', state: {error: 'You need to be logged in to access that'}}} />
  )}/>
);

export default PrivateRouteU;
