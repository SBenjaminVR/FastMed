const Consulta = require('./../models/consultaModel');
const Paciente = require('./../models/pacienteModel');

exports.getAllConsultas = async (req, res) => {
    try {
        const consultas = await Consulta.find();

        res.status(200).json({
            status: 'success',
            results: consultas.length,
            data: {
                consultas
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getConsultasDoctor = async (req, res) => {
    try {
        const consultas = await Consulta.find({doctor: req.params.id});
        for (let consulta of consultas) {
            let paciente = await paciente.findById(consulta.paciente);

            let nombrePac = paciente.nombre;
            let apellidoPac = paciente.apellidos;
            let datosExtra = {'NombrePaciente': nombrePac, 'ApellidoPaciente': apellidoPac};
            arr.push({...cita._doc,...datosExtra});
        }

        res.status(200).json({
            status: 'success',
            results: consultas.length,
            data: {
                consultas
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getConsulta = async (req, res) => {
    try {
        const consulta = await Consulta.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                consulta
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createConsulta = async (req, res) => {
    try {
        console.log(req.body);
        const newConsulta = await Consulta.create(req.body);
        console.log(newConsulta);

        res.status(201).json({
            status: 'success',
            data: {
                consulta: newConsulta
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};

exports.updateConsulta = async (req, res) => {
    try {
        const updatedConsulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                updatedConsulta
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteConsulta = async (req, res) => {
    try {
        await Consulta.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'consulta deleted sucessfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}