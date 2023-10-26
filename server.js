const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 😫 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const app = require('./app');

// console.log(app.get('env'));
// console.log(process.env);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log(con.connections);
//     console.log('DB connections successful');
//   });

// Connect to mongoose online

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

// we can end it here
// .catch((error) => {
//   console.error('DB connection error:', error);
// });

// const dbURI = 'mongodb://localhost:27017/my-api';
// const dbURI = 'mongodb://127.0.0.1:27017/my-api';

// Connect to Local Database
/*
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });
  */
// .catch((error) => {
//   console.error('DB connection error:', error);
// });

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 997,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error 😪', err);
//   });
/*
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
*/

const port = process.env.PORT || 3000;
const host = '[::]'; // Listen on all network interfaces

const server = app.listen(port, host, () => {
  console.log(`App running on ${host}:${port}`);
});

// start: {
//     "start:dev": "nodemon server.js",
//     "start:prod": "NODE_ENV=production server.js"
// }

// npm i eslint prettier
// eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb
// eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y
// eslint-plugin-react --save-dev

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 😫 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
