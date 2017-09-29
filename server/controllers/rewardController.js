const express = require('express');
const router = express.Router();
const Promise = require('promise')
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
        util.response(error, error_key.not_found, null, res);
    })
})

router.put('/:reward_id', (req, res) => {
    const reward_id = req.params.reward_id;
    const body = req.body;

    updateRewardById()
    .then(reward => {
        util.response('', null, reward, res);
    })
    .catch(error => {
        util.response(error, error_key.not_found, null, res);
    })

    function updateRewardById() {
        return new Promise((resolve, reject) => {

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
                    if (error) return reject(error);
                    return resolve(object);
                })
            })
            .catch(error => {
                reject(error);
            })
        });
        
    }
})


function getRewardById(reward_id) {
    return new Promise((resolve, reject) => {
        Reward.findById(reward_id)
        .exec((error, object) => {
            if (error) return reject(error);
            return resolve(object);
        });
    });
}

module.exports = router;