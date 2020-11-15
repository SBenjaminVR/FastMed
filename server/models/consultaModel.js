const mongoose = require('mongoose');

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
    estudiosDiagnosticos: [String],
    doctor: {
        type: Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    paciente: {
        type: Schema.Types.ObjectId, 
        ref: 'Paciente'
    },
    diagnostico: {
        type: Schema.Types.ObjectId, 
        ref: 'Diagnostico'
    },
    tratamiento: {
        type: Schema.Types.ObjectId, 
        ref: 'Tratamiento'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})
const Consulta =  mongoose.model('Paciente', consultaSchema);

module.exports = Consulta