const express = require('express');
const bodyParser = require('body-parser');
const { PORT, SERVER_LINK } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const cors = require('cors');
const colors = require('colors');
const cron = require('node-cron');
const axios = require('axios');
const Redis = require('ioredis');

const db = require('./models/index');

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

	const redis = new Redis({
		host: '127.0.0.1',
		port: 6379,
	});

	redis.on('connect', () => {
		console.log('Connected to Redis!');
	});

	redis.on('error', (err) => {
		console.error('Redis error:', err);
	});

	app.use('/api', ApiRoutes);

	app.get('/ping', (req, res) => {
		console.log(`Ping received at ${new Date().toISOString()}`);
		res.json({ message: "Server is awake" });
	});

	cron.schedule('0 */2 * * *', async () => {
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
		console.log(`Server started at ${PORT}`.bgCyan);
		if (process.env.SYNC_DB === 'true') {
			db.sequelize.sync({ alter: true });
		}
	})
}

startUpServer();