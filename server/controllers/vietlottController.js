const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const async = require('async');
const constant = require('../config/constant');
const general_util = require('../libs/general_util');

const Test = require('../models/test');

router.get('/', function(req, res) {
    const test = new Test();
    test.name = 'bao';
    test.age = 25;
    test.save(function(error, object) {
        console.log(error);
        console.log(success.toJSON());
    });
    general_util.response('successfuly', {}, false, res);
});

module.exports = router;