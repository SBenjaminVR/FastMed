const express = require('express');
const pacienteController = require('./../controllers/pacienteController');

const router = express.Router();

router.route('/').get(pacienteController.getAllPacientes).post(pacienteController.createPaciente);
router.route('/:id').get(pacienteController.getPaciente).patch(pacienteController.updatePaciente).delete(pacienteController.deletePaciente)
router.route('/doctor/:id').get(pacienteController.getPacientesDoctor);

module.exports = router;