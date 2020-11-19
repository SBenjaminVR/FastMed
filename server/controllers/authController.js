const User = require('./../models/userModel');
const Doctor = require('./../models/doctorModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signupUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id)

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.signupDoctor = async (req, res, next) => {
    try {
        const newDoctor = await Doctor.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                user: newDoctor
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let rol = "Doctor"
        let usuario = await Doctor.findOne({ email }).select('+password');
        if (!usuario) {
            usuario = await User.findOne({ email }).select('+password');
            rol = "Usuario"
        }

        if (!usuario || !(await usuario.correctPassword(password, usuario.password))) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Incorrect email or password'
            })
        }

        const token = signToken(usuario._id)
        console.log(token);
        res.status(200).json({
            status: 'success',
            type: rol,
            id: usuario._id,
            token
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}