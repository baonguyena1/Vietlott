const express = require('express');
const app = express();
var mongoose = require('mongoose');
const path = require('path');
const body_parser = require('body-parser');

const Logger = require('./log/log');
const constant = require('./config/constant');
const cron = require('./cronjob/cronjob');
const database = require('./config/database');
const utils = require('./libs/database_util');

const vietlottController = require('./controllers/vietlottController');
const rewardController = require('./controllers/rewardController');

app.use(body_parser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// App API version
const API_V1 = '/api/v1';

app.use(function (req, res, done) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, access_token");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", "true");
    return done();
});

mongoose = utils.connectDatabase(mongoose, database.mongodb);

app.listen(constant.listen_port, function() {
    Logger.logInfo('App listening at port ' + constant.listen_port);
});

app.get('/', function(req, res) {
    res.send('Welcome to Vietlott Application!');
});

cron.start();

app.use(API_V1 + '/vietlotts/', vietlottController);
app.use(API_V1 + '/rewards/', rewardController);