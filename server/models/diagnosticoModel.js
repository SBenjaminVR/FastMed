const mongoose = require('mongoose');

const diagnosticoSchema = new mongoose.Schema({
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
const Diagnostico =  mongoose.model('Diagnostico', diagnosticoSchema);

module.exports = Diagnostico