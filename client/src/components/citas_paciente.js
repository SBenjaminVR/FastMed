import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid" 
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

//window.localStorage.set('patient','5fb1cd3c75b837507498a7e7')
const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const convertirFecha = (fechaNativa) => {
    let fechaNueva = new Date(fechaNativa);
    let minutes = fechaNueva.getMinutes() < 10 ? '00' : fechaNueva.getMinutes();
    return `${dias[fechaNueva.getDay()]} ${fechaNueva.getDate()} de ${meses[fechaNueva.getMonth()]} ${fechaNueva.getHours()}:${minutes}`
}

const fetchCitas = async () =>  {
    //const patient = window.localStorage.get('patient')
    const {data } = await axios.get(`http://localhost:4000/api/citas/paciente/5fb1cd3c75b837507498a7e7`) 

    return data.payload
}
 
const CitasPaciente = () => {
 
    const [state, setState] = useState({
        citas: [], loading: false, doctores: []
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
            <h1 className='meg'>Mis citas</h1>
            <p>Estas son las próximas citas programadas</p>
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
            <div className="citaDetalles"><Grid container direction="column"> <div className="citaName">{cita.NombreDoctor}</div> <div className="citaMotivo">{cita.motivoCita}</div></Grid></div>
            <div className="fechaCita">{cita.fecha}</div>
        </Grid>
    </Paper>
)
}
