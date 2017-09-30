const _ = require('underscore');
const moment = require('moment');
const constant = require('../config/constant');

var general_util = {
    /**
     * 
     */
    response: function(message, error_code, data, res) {
        var response = {};
        response[constant.status] = this.isNull(error_code);
        response[constant.message] = message;
        response[constant.error_code] = error_code;
        response[constant.results] = (this.isNull(data) ? {} : data);
        response[constant.server_time] = new Date().toISOString();
        res.json(response);
    },
    /**
     * Get error message from error object
     * @param {* Object} error
     */
    generateMessageFromError: function(error) {
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
    },
    dateString(date) {
        const dateObj = new Date(date);
        return moment(dateObj).format(constant.day_format);
    }
};

module.exports = general_util;