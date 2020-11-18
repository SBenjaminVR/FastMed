const express = require('express');
const citaController = require('./../controllers/citaController');

const router = express.Router();

router.route('/').get(citaController.getAllCitas).post(citaController.createCita);
router.route('/:id').get(citaController.getCita).patch(citaController.updateCita).delete(citaController.deleteCita)
router.route('/doctor/:id').get(citaController.getCitasDoctor);
router.route('/paciente/:id').get(citaController.getCitasPaciente);

module.exports = router;