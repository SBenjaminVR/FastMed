import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid" 
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

//window.localStorage.set('patient','5fb1cd3c75b837507498a7e7')

const fetchCitas = async () =>  {
    //const patient = window.localStorage.get('patient')
    const {data } = await axios.get(`http://localhost:4000/api/citas/paciente/5fb1cd3c75b837507498a7e7`) 

    return data.payload
}
 
const  CitasPaciente = () => {
 
    const [state, setState] = useState({
        citas: [], loading: false, doctores: []
    })

    useEffect( async() => {
        const {citasPaciente} = await fetchCitas()
        //console.log(citasPaciente);
        
        setState((prevState) => ({...prevState, citas: citasPaciente}))
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
            <div className="citaDetalles"><Grid container direction="column"> <div className="citaName">{cita.doctor.nombre}</div> <div className="citaMotivo">{cita.motivo}</div></Grid></div>
            <div className="fechaCita">{cita.fecha}</div>
        </Grid>
    </Paper>
)
}
