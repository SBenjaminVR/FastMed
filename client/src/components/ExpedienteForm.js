import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ExpedienteFormFilled from './ExpedienteFormFilled';
import CircularProgress from '@material-ui/core/CircularProgress';

const UserId = localStorage.getItem('id');

const initialState = {
  loading: true,
  existente: false,
  error: "",
  data: [],
  form: {
    nombre: "",
    apellidos: "",
    direccion: {
      calle: "",
      numero: 0,
      colonia: "",
      codigoPostal: 0,
      ciudad: "",
      estado: ""
    },
    telefono: "",
    datosFiscales: {
      razonSocial: "",
      rfc: "",
      direccion: {
        calle: "",
        numero: 0,
        colonia: "",
        codigoPostal: 0,
        ciudad: "",
        estado: ""
      },
      email: ""
    },
    historialMedicoRelevante: {
      antecedentesMedicos: "",
      medicamenteUsoDiario: ""
    },
    doctor: UserId
  }
};

function ExpedienteForm() {
  const [data, setData] = useState(initialState);
  const axios = require('axios');
  let location = useLocation();
  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let idPaciente = parsed ? parsed.id : "";
  data.existente = idPaciente !== undefined ? true: false;
  if (!data.existente) {data.loading = false}

  const getRequest = async () => {
    try {
      const resp = await axios.get(`https://fastmedexp.herokuapp.com/api/pacientes/${idPaciente}`);
      return resp.data.data;
    } catch (err) {
      console.error(err.response);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { paciente } = await getRequest();
      delete paciente._id;
      delete paciente.__v;

      await setData((prevState) => ({ ...prevState, loading: false, form: paciente}))
    }
    if (data.existente) { fetchData(); }
  }, []);
  console.log(data);

  return ( 
      !data.loading 
      ? <ExpedienteFormFilled form={data.form} existente={data.existente} idPaciente={idPaciente}/>
      : <CircularProgress />
  );
}

export default ExpedienteForm;