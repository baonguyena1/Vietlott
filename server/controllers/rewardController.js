const express = require('express');
const router = express.Router();
const Q = require('q');
const moment = require('moment');

const Logger = require('../log/log');
const constant = require('../config/constant');
const util = require('../libs/general_util');
const error_key = require('../config/error_key');

const Test = require('../models/test');
const Reward = require('../models/reward');
const Vietlott = require('../models/vietlott');

router.get('/:reward_id', (req, res) => {
    const reward_id = req.params.reward_id;
    getRewardById(reward_id)
    .then(reward => {
        util.response('', null, reward, res);
    })
    .catch(error => {
        util.response(util.generateMessageFromError(error), error_key.not_found, null, res);
    })
});

router.post('/', (req, res) => {
    Logger.logInfo('[BEGIN] create reward');
    const body = req.body;
    createReward()
    .then(object => {
        util.response('', null, object, res);
    })
    .catch(error => {
        util.response(util.generateMessageFromError(error), error_key.not_found, null, res);
    })
    .then(() => {
        Logger.logInfo('[BEGIN] create reward');
    });
    
    function createReward() {
        const reward = new Reward();

        reward.reward_type = body.reward_type;
        reward.prize_value = body.prize_value;
        reward.quantum = body.quantum;
        var defer = Q.defer();
        reward.save((error, object) => {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(object);
            }
        });
        return defer.promise;
    }
});

router.put('/:reward_id', (req, res) => {
    const reward_id = req.params.reward_id;
    const body = req.body;

    updateRewardById()
    .then(reward => {
        util.response('', null, reward, res);
    })
    .catch(error => {
        util.response(util.generateMessageFromError(error), error_key.not_found, null, res);
    })

    function updateRewardById() {
        var defer = Q.defer();
        getRewardById(reward_id)
        .then(reward => {
            
            if (!util.isNull(body.prize_value)) {
                reward.prize_value = body.prize_value;
            }
            if (!util.isNull(body.quantum)) {
                reward.quantum = body.quantum;
            }
            if (!util.isNull(body.reward_type)) {
                reward.reward_type = body.reward_type;
            }

            reward.save((error, object) => {
                if (error) {
                    defer.reject(error);
                } else {
                    defer.resolve(object);
                }
            });
        })
        .catch(error => {
            defer.reject(error);
        });
        return defer.promise;
    }
});

function getRewardById(reward_id) {
    var defer = Q.defer();
    Reward.findById(reward_id)
    .exec((error, object) => {
        if (error) {
            defer.reject(error);
        } else {
            defer.resolve(object);
        }
    });
    return defer.promise;
};

module.exports = router;