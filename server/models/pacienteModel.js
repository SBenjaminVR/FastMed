const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    direccion: {
        calle: String,
        numero: String,
        colonia: String,
        codigoPostal: Number,
        ciudad: String,
        estado: String,
    },
    telefono: {
        type: String, 
        required: true
    },
    datosFiscales: {
        razonSocial: String,
        rfc: String,
        direccion: {
            calle: String,
            numero: String,
            colonia: String,
            codigoPostal: Number,
            ciudad: String,
            estado: String,
        },
        email: String
    },
    historialMedicoRelevante: {
        antecedentesMedicos: String,
        medicamenteUsoDiario: String
    },
    doctor: {
        type: Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})
const Paciente =  mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente