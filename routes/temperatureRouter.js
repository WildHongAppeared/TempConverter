const { Router } = require('express');
const TemperatureController = require('../controllers/temperatureController')
const router = Router();

router.post('/convert/:convertTo', TemperatureController.convertTemperature);

module.exports = router