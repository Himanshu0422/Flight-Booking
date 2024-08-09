const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors')
const app = express();

const { PORT } = require('./config/serverConfig');
const db = require('./models/index');
const apiRoutes = require('./routes/index');

const setupAndStartServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.bgMagenta);
    if (process.env.DB_SYNC === 'true') {
      db.sequelize.sync({ alter: true });
    }
  });
}

setupAndStartServer();