import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid" 
import Paper from '@material-ui/core/Paper';

const fetchCitas = () => {

    return [
        {paciente: 'Juan Perez',
        fecha:"23-11-2020 11:30 A.M.",
        motivo:"Dolor de cabeza"
        },
        {paciente: 'Ramón Ayala',
        fecha:"25-11-2020 1:30 P.M.",
        motivo:"Estoy crudo"
        },
        {paciente: 'Gustavo Guzmán',
        fecha:"25-11-2020 3:45 P.M.",
        motivo:"GG ez"
        },
        {paciente: 'Esteban Dhido',
        fecha:"26-11-2020 10:15 A.M.",
        motivo:"Herida de bala"
        },
    ]
        //console.log('fetchCitas');
}
 
const  CitasDoctor = () => {
 
const [state, setState] = useState({
    citas: [], loading: false, pacientes: []
})

    useEffect(() => {
     
        setState((prevState) => ({...prevState, citas: fetchCitas()}))
    }, [])
    
    return ( 
        <div className="cita-container">
            <h1 className='meg'>Usted tiene estas citas programadas</h1>
            <p>Estas son las citas programadas dentro de los proximos 7 días</p>
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
            <div className="citaDetalles"><Grid container direction="column"> <div className="citaName">{cita.paciente}</div> <div className="citaMotivo">{cita.motivo}</div></Grid></div>
            <div className="fechaCita">{cita.fecha}</div>
        </Grid>
    </Paper>
)
}
