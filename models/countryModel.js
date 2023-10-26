const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

//validators: require
const countrySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'A country must have a name'],
      unique: true,
      trim: true,
      maxlength: [60, 'A country must have less or equal than 60 characters'],
      minlength: [3, 'A country must have more or equal than 3 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain character'],
    },
    slug: String,
    population: {
      type: Number,
      required: [true, 'A country must have a population'],
    },
    capital: String,

    continent: {
      type: String,
      required: [true, 'A country must have a continent'],
      enum: {
        values: [
          'Africa',
          'Antarctica',
          'Asia',
          'Europe',
          'North America',
          'Australia',
          'Oceania',
          'South America',
          'Europe/Asia',
        ],
        message:
          'Continent must be one of the following: Africa, Antarctica, Asia, Europe, North America, South America, Australia or Oceania',
      },
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // we don't want it to be displayed to users
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Events are not saved into the database
// tourSchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7;
// });

// DOCUMENT MIDDLEWARE: runs b4 save() and .create()
countrySchema.pre('save', function (next) {
  // console.log(this);
  // This points to the document to be saved
  this.slug = slugify(this.country, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will Save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// This ^find will work for every command that start with find
/*
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});
*/

// tourSchema.pre('find', function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

// eslint-disable-next-line prefer-arrow-callback
countrySchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
/*
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log('this.pipeline', this.pipeline());
  console.log("It's a good day");
  next();
});
*/

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
