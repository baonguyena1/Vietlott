const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const request = require('request');
const htmlparser = require("htmlparser2");
const Promise = require('promise')
const moment = require('moment');

const Logger = require('../log/log');
const constant = require('../config/constant');
const general_util = require('../libs/general_util');
const error_key = require('../config/error_key');

const Test = require('../models/test');
const Reward = require('../models/reward');
const Vietlott = require('../models/vietlott');

/**
 * Get lasted vietlott
 */
router.get('/', (req, res) => {
    const test = new Test();
    test.name = 'bao';
    test.age = 'dsdsd';
    test.save((error, object) => {
        return general_util.response(error, error_key.not_found, object, res);
    });
});

/**
 * Create new vietlott
 */
router.post('/', function(req, res) {
    Logger.logDebug('[BEGIN] Add new vietlott');
    const body = req.body;
    const first_prize = body.first_prize;
    const second_prize = body.second_prize;
    const third_prize = body.third_prize;
    const jackpot = body.jackpot;
    const reward_id = body.reward_id;
    const bonus_day = moment(body.bonus_day, 'dd-MM-yyyy hh:mm:ss');

    Promise.all([
        addReward(first_prize),
        addReward(second_prize),
        addReward(third_prize),
        addReward(jackpot)
    ])
    .then(function([first_prize_id, second_prize_id, third_prize_id, jackpot_id]) {
        Logger.logInfo('first_prize_id ' + first_prize_id);
        Logger.logInfo('second_prize_id ' + second_prize_id);
        Logger.logInfo('third_prize_id ' + third_prize_id);
        Logger.logInfo('jackpot_id ' + jackpot_id);
        return addVietlott(first_prize_id, second_prize_id, third_prize_id, jackpot_id, reward_id, bonus_day);
    })
    .then(function(vietlott) {
        general_util.response('', null, vietlott, res);
    })
    .catch(function(error) {
        general_util.response('failed', error_key.not_found, {}, res);
    })
    .then(() => {
        Logger.logDebug('[END] Add new vietlott');
    });
});


/**
 * 
 * @param {* JSON} rewardJSON
 */
function addReward(rewardJSON) {
    const reward = new Reward();
    reward.reward_type = rewardJSON.reward_type;
    reward.quantum = rewardJSON.quantum;
    reward.prize_value = rewardJSON.prize_value;

    return new Promise(function(resolve, reject) {
        reward.save(function(error, object) {
            if (error) {
                reject(error);
            } else {
                resolve(object.id);
            }
        });
    });
};

/**
 * 
 * @param {* ObjectId} first_prize 
 * @param {* ObjectId} second_prize 
 * @param {* ObjectId} third_prize 
 * @param {* ObjectId} jackpot 
 * @param {* String} reward_id 
 * @param {* Date format dd-MM-yyyy hh:mm:ss} bonus_day
 */
function addVietlott(first_prize, second_prize, third_prize, jackpot, reward_id, bonus_day) {
    const vietlott = new Vietlott();
    vietlott.first_prize = first_prize;
    vietlott.second_prize = second_prize;
    vietlott.third_prize = third_prize;
    vietlott.jackpot = jackpot;
    vietlott.reward_id = reward_id;
    vietlott.bonus_day = bonus_day;

    return new Promise(function(resolve, reject) {
        vietlott.save(function(error, object) {
            if (error) {
                reject(error);
            } else {
                resolve(object);
            }
        });
    });
};

module.exports = router;