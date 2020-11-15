const mongoose = require('mongoose');

const tratamientoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})
const Tratamiento =  mongoose.model('Tratamiento', tratamientoSchema);

module.exports = Tratamiento