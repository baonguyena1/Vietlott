const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const async = require('async');
const constant = require('../config/constant');
const general_util = require('../libs/general_util');

router.get('/', function(req, res) {
    var datas = {
        'username': 'bao',
        'age': 25
    };
    general_util.response('successfuly', {}, false, res);
});

module.exports = router;