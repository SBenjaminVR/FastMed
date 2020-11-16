const Tratamiento = require('./../models/tratamientoModel');

exports.getAllTratamientos  = async (req, res) => {
    try {
    const tratamientos = await Tratamiento.find();

    res.status(200).json({
        status: 'success',
        results: tratamientos.length,
        data: {
            tratamientos
        }
    });
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
};

exports.getTratamiento = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tratamiento
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTratamiento = async (req, res) => {
    try {
        const newTratamiento = await Tratamiento.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tratamiento: newTratamiento
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};

exports.updateTratamiento = async (req, res) => {
    try {
        const updatedTratamiento = await Tratamiento.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data: {
                updatedTratamiento
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTratamiento = async (req, res) => {
    try {
        await Tratamiento.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'tratamiento deleted sucessfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}