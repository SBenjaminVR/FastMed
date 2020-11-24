import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    bot:{
        display: 'flex',
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lista:{
        // display: 'flex',

    }
  }));

const UserId = localStorage.getItem('id');




function Bot() {

    const [state, setState] = useState({
        loading: false, doctores: []
      })
    
      useEffect(() => {
        const fetchData = async () => {
            const {doctors} = await fetchDoctores();  
            setState((prevState) => ({...prevState, doctores: doctors}))
        }
    fetchData();
    }, [])

    const fetchDoctores = async () => {
        const {data } = await axios.get(`https://fastmedexp.herokuapp.com/api/doctors`); 
        return data.data;
      }

    const classes = useStyles();
    //console.log(UserId);
    console.log(state);
    return (
        <div>
            <h1>{`Su id es ${UserId}`}</h1>
            <h3>Los Doctores disponibles son: </h3>
            <ul  className={classes.lista}>
             {state.doctores.map(doctor => (<li>{`${doctor.nombre} ${doctor.apellidos}`}</li>))} 
            </ul>
            <div className={classes.bot}>
            <iframe  width="350" height="500" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/1b4010a7-48f0-4845-ba2d-00c397181441"></iframe>

            </div>
        </div>
    )
}

export default Bot;
