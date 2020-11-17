import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid" 
import Paper from '@material-ui/core/Paper';

const fetchCitas = () => {

    return [
        {doctor: 'Dr.Jaime',
        fecha:"23-11-2020 11:30 A.M.",
        motivo:"Dolor de cadera"
        },
        {doctor: 'Dr. Juan',
        fecha:"24-11-2020 1:30 P.M.",
        motivo:"Dolor muslo derecho"
        },
        {doctor: 'Dr. José',
        fecha:"25-11-2020 2:45 P.M.",
        motivo:"Dolor en el pancreas"
        },
        {doctor: 'Dr. Josefina',
        fecha:"26-11-2020 5:30 P.M.",
        motivo:"Dolor sentimental"
        },
    ]
        //console.log('fetchCitas');
}
 
const  CitasPaciente = () => {
 
    const [state, setState] = useState({
        citas: [], loading: false, doctores: []
    })

    useEffect(() => {
     
        setState((prevState) => ({...prevState, citas: fetchCitas()}))
    }, [])
    
    return ( 
        <div className="cita-container">
            <h1 className='meg'>Mis citas</h1>
            <p>Estas son las citas programadas dentro de los proximos 7 días</p>
            <Grid container direction="column" justify="center" alignItems="strech">
                {state.citas && state.citas.map(cita => (<Cita cita={cita}/>))}
            </Grid>
        </div>
    )
}

export default CitasPaciente;


const Cita = ({cita}) => {
console.log(cita);
return (
    <Paper className ="cita"> 
        <Grid container direction="row" justify="space-between">
            <div className="citaDetalles"><Grid container direction="column"> <div className="citaName">{cita.doctor}</div> <div className="citaMotivo">{cita.motivo}</div></Grid></div>
            <div className="fechaCita">{cita.fecha}</div>
        </Grid>
    </Paper>
)
}
