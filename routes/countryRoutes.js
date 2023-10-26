const express = require('express');

const countryController = require('../controllers/countryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(countryController.aliasTopTours, countryController.getAllCountries);

router
  .route('/')
  .get(countryController.getAllCountries)
  .post(authController.protect, countryController.createCountry);

router
  .route('/:id')
  .get(countryController.getCountry)
  .patch(authController.protect, countryController.updateCountry)
  .delete(authController.protect, countryController.deleteCountry);

module.exports = router;
