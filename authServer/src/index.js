const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const cors = require('cors');
const colors = require('colors');
const ApiRoutes = require('./routes/index');
const passport = require('./config/passport')
const session = require('express-session'); 

const db = require('./models/index');

const startUpServer = () => {
    const app = express();
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', ApiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`.bgCyan);
        if(process.env.SYNC_DB === 'true') {
            db.sequelize.sync({alter: true});
        }
    })
}

startUpServer();