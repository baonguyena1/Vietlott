const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const body_parser = require('body-parser');

const constant = require('./config/constant');
const vietlottController = require('./controllers/vietlottController');
const cron = require('./cronjob/cronjob');

app.use(body_parser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(function (req, res, done) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, access_token");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", "true");
    return done();
  });

app.listen(constant.listen_port, function() {
    console.log('App listening at port ' + constant.listen_port);
});

app.get('/', function(req, res) {
    res.send('Welcome to Vietlott Application!');
});

cron.start();

app.use('/vietlott/', vietlottController);