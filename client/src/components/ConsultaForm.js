import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ConsultaFormFilled from './ConsultaFormFilled';
import CircularProgress from '@material-ui/core/CircularProgress';

const DOC = localStorage.getItem('id');
const initialState = {
  loading: true,
  error: "",
  data: [],
  form: {
    fecha: "",
    motivoConsulta: "",
    evolucion: "",
    exploracionFisica: {
      altura: 0,
      peso: 0,
      imc: 0,
      observacion: ""
    },
    tratamiento: "",
    doctor: DOC,
    paciente: ""
  },
};

function Form() {
  const [data, setData] = useState(initialState);
  let location = useLocation();
  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let idPaciente = parsed ? parsed.id : "";
  data.existente = idPaciente !== undefined ? true: false;
  if (!data.existente) {data.loading = false}

  const fetchConsulta = async () => {
    const {data} = await axios.get(`https://fastmedexp.herokuapp.com/api/consultas/${idPaciente}`);
    return data.data
  }

  useEffect(() => {
    const fetchData = async () => {
      const { consulta } = await fetchConsulta();
      delete consulta._id;
      delete consulta.__v;
      setData((prevState) => ({...prevState, form: consulta, loading: false}))
    }
    if (data.existente) {
      fetchData();
    }
  }, [])

  return (
    !data.loading 
      ? <ConsultaFormFilled form={data.form} existente={data.existente} idPaciente={idPaciente}/>
      : <CircularProgress />
  );
}

export default Form;