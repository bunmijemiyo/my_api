const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/countryRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//Mddlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 🖐');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from the server side!');
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this end point...');
// });

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// 2. Route Handlers
//

// 3. Routes
// const tourRouter = express.Router();
// const userRouter = express.Router();
app.use('/api/v1/countries', tourRouter);
app.use('/api/v1/users', userRouter);

// Handles all wrong url address
app.all('*', (req, res, next) => {
  // sample 1
  // res.status('404').json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  //sample 2
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
  // sample 3
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id/:x/:y?')

// app.post('/api/v1/tours', createTour);
// app.patch('api/v1/tours/:id', updateTour);
// app.delete('api/v1/tours/:id', deleteTour);

// tourRouter.route('/').get(getAllTours).post(createTour);

// app.route('api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
// app.get('/api/v1/tours/:id', getTour);

app.use(globalErrorHandler);
// 4. Server

module.exports = app;
