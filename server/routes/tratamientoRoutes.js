const express = require('express');
const tratamientoController = require('./../controllers/tratamientoController');

const router = express.Router();

router.route('/').get(tratamientoController.getAllTratamientos).post(tratamientoController.createTratamiento);
router.route('/:id').get(tratamientoController.getTratamiento).patch(tratamientoController.updateTratamiento).delete(tratamientoController.deleteTratamiento)

module.exports = router;