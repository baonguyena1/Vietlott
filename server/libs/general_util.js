const _ = require('underscore');
const constant = require('../config/constant');

var general_util = {
    /**
     * 
     */
    response: function(message, error_code, data, res) {
        var response = {};
        response[constant.status] = this.isNull(error_code);
        if (this.isNull(error_code)) {
            // Response success
            response[constant.message] = message;
        } else {
            response[constant.message] = this.generateErrorMessage(message);
        }
        response[constant.error_code] = error_code;
        response[constant.results] = this.isNull(data) ? {} : data;
        response[constant.server_time] = new Date().toISOString();
        res.json(response);
    },
    generateErrorMessage: function(error) {
        const errors = error.errors;
        const keys = Object.keys(errors);
        var errorArray = [];
        for (var index in keys ) {
            errorArray.push(errors[keys[index]].message);
        }
        return errorArray.join(', ');
    },
    isNull: function (value) {
        return _.isUndefined(value) || _.isNull(value);
    }
};

module.exports = general_util;