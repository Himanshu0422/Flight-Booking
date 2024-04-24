const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const cors = require('cors');
const colors = require('colors');

const db = require('./models/index');

const startUpServer = () => {
    const app = express();
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`.bgCyan);
        if(process.env.SYNC_DB === 'true') {
            db.sequelize.sync({alter: true});
        }
    })
}

startUpServer();