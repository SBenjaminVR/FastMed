const Cita = require('./../models/citaModel');

exports.getAllCitas  = async (req, res) => {
    try {
    const citas = await Cita.find();

    res.status(200).json({
        status: 'success',
        results: citas.length,
        data: {
            citas
        }
    });
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
};

exports.getCita = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                cita
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createCita = async (req, res) => {
    try {
        const newCita = await Cita.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                cita: newCita
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};

exports.updateCita = async (req, res) => {
    try {
        const updatedCita = await Cita.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data: {
                updatedCita
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteCita = async (req, res) => {
    try {
        await Cita.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'cita deleted sucessfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}