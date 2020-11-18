const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId, 
        ref: 'Doctor'
    },
    paciente: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    sintomas: String, 
    motivoCita: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})
const Cita =  mongoose.model('Cita', citaSchema);

module.exports = Cita