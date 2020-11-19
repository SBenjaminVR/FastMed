const Cita = require('./../models/citaModel');
const Doctor = require('./../models/doctorModel');
const User = require('./../models/userModel');

exports.getAllCitas = async (req, res) => {
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

async function obtenerInformacionExtra(citas) {
    let arr = [];
    for (let cita of citas) {
        let doctor = await Doctor.findById(cita.doctor);
        let user = await User.findById(cita.paciente);

        let nombreDoc = `Dr. ${doctor.nombre} ${doctor.apellidos}`;
        let nombrePac = `${user.nombre} ${user.apellidos}`;
        let datosExtra = {'NombreDoctor': nombreDoc, 'NombrePaciente': nombrePac};
        arr.push({...cita._doc,...datosExtra});
    }

    return arr;
}

exports.getCitasDoctor = async (req, res) => {
    try {
        let citasDoctor = await Cita.find({doctor: req.params.id});
        let citasData = await obtenerInformacionExtra(citasDoctor);

        res.status(200).json({
            status: 'success',
            results: citasDoctor.length,
            payload: {
                citasData
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getCitasPaciente = async (req, res) => {
    try {
        const citasPaciente = await Cita.find({paciente: req.params.id});
        let citasData = await obtenerInformacionExtra(citasPaciente);

        res.status(200).json({
            status: 'success',
            results: citasPaciente.length,
            payload: {
                citasData
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
        const doctorCita = await Doctor.findOne({
            $or: [
                { "nombre": { $regex: `${req.body.doctor}`, $options: 'i' } },
                { "apellidos": { $regex: `${req.body.doctor}`, $options: 'i' } },
            ]
        });
        if (!doctorCita) {
            res.status(400).json({
                status: 'fail',
                message: 'That doctor is not in the databse'
            })
        }
        req.body.doctor = `${doctorCita._id}`;
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
        const updatedCita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

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