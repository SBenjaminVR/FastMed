const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})
const User =  mongoose.model('User', userSchema);

module.exports = User