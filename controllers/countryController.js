// const fs = require('fs');
// const Tour = require('../models/countryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Country = require('../models/countryModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-population';
  req.query.fields = 'country,capital,populationn,country';
  next();
};

exports.getAllCountries = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Country.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const countries = await features.query;
  // query.sort().select().skip().limit()

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: countries.length,
    data: {
      countries,
    },
  });
});

exports.createCountry = catchAsync(async (req, res, next) => {
  const newCountry = await Country.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      country: newCountry,
    },
  });
});

exports.getCountry = catchAsync(async (req, res, next) => {
  const country = await Country.findById(req.params.id);
  //Country.findOne({_id: req.params.id})

  if (!country) {
    return next(new AppError('No country found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      country,
    },
  });
});

exports.updateCountry = catchAsync(async (req, res, next) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // this ensures validation check is done again
  });

  if (!country) {
    return next(new AppError('No country found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      country: country,
    },
  });
});

exports.deleteCountry = catchAsync(async (req, res, next) => {
  const country = await Country.findByIdAndDelete(req.params.id);

  if (!country) {
    return next(new AppError('No country found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
