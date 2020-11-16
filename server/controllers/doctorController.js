const Doctor = require('./../models/doctorModel');

exports.getAllDoctors  = async (req, res) => {
    try {
    const doctors = await Doctor.find();

    res.status(200).json({
        status: 'success',
        results: doctors.length,
        data: {
            doctors
        }
    });
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
};

exports.getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doctor: newDoctor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data: {
                updatedDoctor
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'doctor deleted sucessfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}