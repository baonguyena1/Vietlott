const _ = require('underscore');
const constant = require('../config/constant');
const message_key = require('../config/message_key');
const error_key = require('../config/error_key');

var general_util = {
    /**
     * Function generate response format
     * @param messageKey: key input
     * @param data: data send to client 
     * @param isSuccess: true: success, false: error message
     * @param res: response
     * @return return json message
     */
    response: function(messageKey, datas, isSuccess, res) {
        var response = null;
        if (isSuccess) {
          response = this.generateSuccessWithKey(messageKey);
        } else {
          response = this.generateErrorWithKey(messageKey);
        }
        if (datas) {
          response[constant.results] = datas;
        } else {
            response[constant.results] = {};
        }
        res.json(response);
    },
    /**
     * Function generate success format
     * @param key: key input
     * @return return json message
     */
    generateSuccessWithKey: function(key) {
        var message = '';
        if (key) {
          message = this.generateMessageByKey(key);
        }
        var response = {};
        response[constant.status] = true;
        response[constant.message] = message;
        response[constant.server_time] = new Date().toISOString();
        return response;
    },
    /**
     * Function generate error format
     * @param key: key input
     * @return return json message
     */
    generateErrorWithKey: function(key) {
        var response = {};
        response[constant.status] = false;

        var error = {};
        error[constant.error_code] = this.generateErrorCodeByKey(key);
        error[constant.message] = this.generateMessageByKey(key);
        response[constant.error] = error;

        response[constant.server_time] = new Date().toISOString()
        return response;
    },
    /**
     * get error code by key
     * @return return code number
     */
    generateErrorCodeByKey: function(key) {
        if (key) {
            var keys = key.split('.');
            var errorCode = error_key;
            try {

                keys.forEach(function(element) {
                    errorCode = errorCode[element];
                });
                return errorCode;
            } catch (error) {
                return '';
            }
        }
        return '';
    },
    /**
     * get error message by key
     * @return return error message string
     */
    generateMessageByKey: function(key) {
        if (key) {
            var keys = key.split('.');
            var message = message_key;
            try {
                keys.forEach(function(element) {
                    message = message[element];
                });
                return message;
            } catch (error) {
                return '';
            }
        }
        return null;
    }
};

module.exports = general_util;