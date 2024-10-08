const express = require('express');
const bodyParser = require('body-parser');
const { PORT, SERVER_LINK } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const cors = require('cors');
const colors = require('colors');
const cron = require('node-cron');
const axios = require('axios');

const db = require('./models/index');
const { startRedis } = require('./config/redis');

const startUpServer = () => {
	const app = express();
	app.use(
		cors({
			origin: true,
			credentials: true,
		})
	);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	startRedis();

	app.use('/api', ApiRoutes);

	app.get('/ping', (req, res) => {
		console.log(`Ping received at ${new Date().toISOString()}`);
		res.json({ message: "Server is awake" });
	});

	// Cron job to run every 14 minutes between 8:00 AM and 11:59 PM
	cron.schedule('*/14 8-23 * * *', async () => {
		try {
			console.log('Running cron job on IST schedule');
			const response = await axios.get(`${SERVER_LINK}/ping`);
			console.log('API response:', response.data);
		} catch (error) {
			console.error('Error in cron job:', error);
		}
	}, {
		timezone: "Asia/Kolkata"
	});

	app.listen(PORT, () => {
		console.log(`Server started at ${PORT}`.bgCyan);
		if (process.env.SYNC_DB === 'true') {
			db.sequelize.sync({ alter: true });
		}
	});
}

startUpServer();
