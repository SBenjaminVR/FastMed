const express = require('express');
const doctorController = require('./../controllers/doctorController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signupDoctor);

router.route('/').get(doctorController.getAllDoctors).post(doctorController.createDoctor);
router.route('/:id').get(doctorController.getDoctor).patch(doctorController.updateDoctor).delete(doctorController.deleteDoctor)

module.exports = router;