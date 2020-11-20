const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Falta buscar como agregar las fotos (estudios diagnosticos)
const consultaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    motivoConsulta: String,
    evolucion: String, 
    exploracionFisica: {
        altura: Number,
        peso: Number,
        imc: Number,
        observacion: String
    },
    doctor: {
        type: Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    paciente: {
        type: Schema.Types.ObjectId, 
        ref: 'Paciente'
    },
    tratamiento: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})
const Consulta =  mongoose.model('Consulta', consultaSchema);

module.exports = Consulta