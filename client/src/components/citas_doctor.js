import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid" 
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const convertirFecha = (fechaNativa) => {
    let fechaNueva = new Date(fechaNativa);
    let minutes = fechaNueva.getMinutes() < 10 ? '00' : fechaNueva.getMinutes();
    return `${dias[fechaNueva.getDay()]} ${fechaNueva.getDate()} de ${meses[fechaNueva.getMonth()]} ${fechaNueva.getHours()}:${minutes}`
}

const fetchCitas = async () => {

    const {data } = await axios.get(`http://localhost:4000/api/citas/doctor/5fb18ebbaac5d00878fa63ea`) 

    return data.payload
        
}
 
const  CitasDoctor = () => {
 
const [state, setState] = useState({
    citas: [], loading: false, pacientes: []
})

    useEffect(() => {
        const fetchData = async () => {
            const {citasData} = await fetchCitas();
            for (let i = 0; i < citasData.length; i++) {
                let fechaNueva = convertirFecha(citasData[i].fecha)
                citasData[i]['fecha'] = fechaNueva;
            }
        
            setState((prevState) => ({...prevState, citas: citasData}))
        }
    fetchData();
    }, [])
    
    return ( 
        <div className="cita-container">
            <h1 className='meg'>Usted tiene estas citas programadas</h1>
            <p>Estas son las próximas citas programadas </p>
            <Grid container direction="column" justify="center" alignItems="strech">
                {state.citas && state.citas.map(cita => (<Cita cita={cita}/>))}
            </Grid>
        </div>
    )
}

export default CitasDoctor;


const Cita = ({cita}) => {
console.log(cita);
return (
    <Paper className ="cita"> 
        <Grid container direction="row" justify="space-between">
            <div className="citaDetalles"><Grid container direction="column"> <div className="citaName">{cita.NombrePaciente}</div> <div className="citaMotivo">{cita.motivoCita}</div></Grid></div>
            <div className="fechaCita">{cita.fecha}</div>
        </Grid>
    </Paper>
)
}
