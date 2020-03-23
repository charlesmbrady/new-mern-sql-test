const express = require('express'); // Require express
const app = express(); // Make app with express
const PORT = process.env.PORT || 8080; // Set port to .env or default
const db = require('./models/index.js'); // Require the database connection for server to access
const routes = require('./routes'); // Require the routes to use for api endpoints
const path = require('path'); // Lets us use __dirname as the relative filepath from this file
const cookieParser = require('cookie-parser'); // for the auth token
const withAuth = require('./middleware');
require('dotenv');

// Middlewares
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());

if (global.__coverage__) {
  console.log('registering coverage middleware');
  require('@cypress/code-coverage/middleware/express')(app);
}

app.get('/healthcheck', (req, res) => {
  res.send('App is running!');
});

// app.get('/api/healthcheck', (req, res) => {
//   res.send('App is running!');
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.sendStatus(200);
  });
}

app.use(routes); // Link routes

// Error handler
app.use(function(err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res
    .status(500)
    .send(
      'Internal Server Error: Coming from server error handler in server.js (see server console output for error stack.'
    );
});

const syncOptions = {
  force: process.env.FORCE_SYNC === 'true'
};

if (app.get('env') === 'test') {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(() => {
  if (app.get('env') !== 'test' || syncOptions.force === 'true') {
    require('./db/seed');
  }

  console.log(`Starting the server in ${process.env.NODE_ENV} mode...`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Turn server on
});
