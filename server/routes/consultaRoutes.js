const express = require('express');
const consultaController = require('./../controllers/consultaController');

const router = express.Router();

router.route('/').get(consultaController.getAllConsultas).post(consultaController.createConsulta);
router.route('/:id').get(consultaController.getConsulta).patch(consultaController.updateConsulta).delete(consultaController.deleteConsulta)

module.exports = router;