const express = require('express');
const diagnosticoController = require('./../controllers/diagnosticoController');

const router = express.Router();

router.route('/').get(diagnosticoController.getAllDiagnosticos).post(diagnosticoController.createDiagnostico);
router.route('/:id').get(diagnosticoController.getDiagnostico).patch(diagnosticoController.updateDiagnostico).delete(diagnosticoController.deleteDiagnostico)

module.exports = router;