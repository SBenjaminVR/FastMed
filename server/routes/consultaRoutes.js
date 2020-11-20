const express = require('express');
const consultaController = require('./../controllers/consultaController');
const { route } = require('./authRoutes');

const router = express.Router();

router.route('/').get(consultaController.getAllConsultas).post(consultaController.createConsulta);
router.route('/:id').get(consultaController.getConsulta).patch(consultaController.updateConsulta).delete(consultaController.deleteConsulta)
router.route('/doctor/:id').get(consultaController.getConsultasDoctor);

module.exports = router;