const Diagnostico = require('./../models/diagnosticoModel');

exports.getAllDiagnosticos  = async (req, res) => {
    try {
    const diagnosticos = await Diagnostico.find();

    res.status(200).json({
        status: 'success',
        results: diagnosticos.length,
        data: {
            diagnosticos
        }
    });
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
};

exports.getDiagnostico = async (req, res) => {
    try {
        const diagnostico = await Diagnostico.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                diagnostico
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createDiagnostico = async (req, res) => {
    try {
        const newDiagnostico = await Diagnostico.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                diagnostico: newDiagnostico
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};

exports.updateDiagnostico = async (req, res) => {
    try {
        const updatedDiagnostico = await Diagnostico.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data: {
                updatedDiagnostico
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteDiagnostico = async (req, res) => {
    try {
        await Diagnostico.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'diagnostico deleted sucessfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}