const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');

const db = require('./models/index');

const startUpServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB === 'true') {
            db.sequelize.sync({alter: true});
        }
    })
}

startUpServer();