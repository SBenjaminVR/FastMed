const Consulta = require('./../models/consultaModel');

exports.getAllConsultas  = async (req, res) => {
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
        const newConsulta = await Consulta.create(req.body);

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
        const updatedConsulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

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