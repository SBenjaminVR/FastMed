const express = require('express');
const citaController = require('./../controllers/citaController');

const router = express.Router();

router.route('/').get(citaController.getAllCitas).post(citaController.createCita);
router.route('/:id').get(citaController.getCita).patch(citaController.updateCita).delete(citaController.deleteCita)

module.exports = router;