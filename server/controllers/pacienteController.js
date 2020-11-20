const Paciente = require('./../models/pacienteModel');

exports.getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();

        res.status(200).json({
            status: 'success',
            results: pacientes.length,
            data: {
                pacientes
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getPacientesDoctor = async (req, res) => {
    try {
        const pacientes = await Paciente.find({doctor: req.params.id});

        res.status(200).json({
            status: 'success',
            results: pacientes.length,
            data: {
                pacientes
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                paciente
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createPaciente = async (req, res) => {
    try {
        const newPaciente = await Paciente.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                paciente: newPaciente
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        const updatedPaciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                updatedPaciente
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deletePaciente = async (req, res) => {
    try {
        await Paciente.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'paciente deleted sucessfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}