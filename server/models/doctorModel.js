const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
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
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

doctorSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Doctor =  mongoose.model('Doctor', doctorSchema);

module.exports = Doctor