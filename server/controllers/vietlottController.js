const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const async = require('async');
const request = require('request');
const htmlparser = require("htmlparser2");

const Logger = require('../log/log');
const constant = require('../config/constant');
const general_util = require('../libs/general_util');

const Test = require('../models/test');

router.get('/', function(req, res) {
    const test = new Test();
    test.name = 'bao';
    test.age = 25;
    test.save(function(error, object) {
        Logger.logError(error);
        Logger.logInfo(object);
    });
    general_util.response('successfuly', {}, false, res);
});

router.get("/fetch", function(req, res, next) {
    request('http://vietlott.vn/vi/home/', function(error, response, body) {
        if (error) { 
            return;
        }

        general_util.response('successfuly', null, true, res);

        var responseProcess = function(result) {

        };

    });
});

module.exports = router;