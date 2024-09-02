const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const cors = require('cors')
const app = express();
const cron = require('node-cron');
const axios = require('axios');
const { PORT, SERVER_LINK } = require('./config/serverConfig');
const db = require('./models/index');
const apiRoutes = require('./routes/index');

const setupAndStartServer = () => {
  app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);

  app.get('/ping', (req, res) => {
    console.log(`Ping received at ${new Date().toISOString()}`);
    res.json({ message: "Server is awake" });
  });
  
  cron.schedule('*/14 * * * *', async () => {
    try {
      console.log('Running cron job');
      // Call the /ping API to keep the server awake
      const response = await axios.get(`${SERVER_LINK}/ping`);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.bgMagenta);
    if (process.env.DB_SYNC === 'true') {
      db.sequelize.sync({ alter: true });
    }
  });
}

setupAndStartServer();