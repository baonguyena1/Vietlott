const express = require('express');
const router = express.Router();
const request = require('request');
const htmlparser = require("htmlparser2");
const Promise = require('promise')
const moment = require('moment');

const Logger = require('../log/log');
const constant = require('../config/constant');
const util = require('../libs/general_util');
const error_key = require('../config/error_key');

const Test = require('../models/test');
const Reward = require('../models/reward');
const Vietlott = require('../models/vietlott');

router.get('/test', (req, res) => {

    getTest()
    .then(object => {
        util.response('', null, object, res);
    })
    .catch(error => {
        console.log(error);
        util.response(error, error_key.not_found, null, res);
    })
    .then(() => {

    });

    function createTest() {
        const test = new Test();
        test.name = '123';
        test.age = '123';
        return new Promise((resolve, reject) => {
            test.save((error, object) => {
                if (error) return reject(error);
                return resolve(object);
            });
        });
        
    };

    function getTest() {
        var id = '59ce7e38139aad0339a92db7';
        return new Promise((resolve, reject) => {
            Test.findById(id)
            .exec((error, test) => {
                if (error) return reject(error);
                return resolve(test);
            });
        });
        
    }
});

/**
 * Get lasted vietlott
 */
router.get('/', (req, res) => {
    Logger.logInfo('[BEGIN] Get lasted vietlott');
    getLastedVietlott()
    .then(function(vietlott) {
        util.response('', null, vietlott, res);
    })
    .catch(function(error) {
        util.response(error, constant.not_found, null, res);
    })
    .then(function() {
        Logger.logInfo('[END] Get lasted vietlott');
    })
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
    const bonus_day = moment(body.bonus_day, 'DD-MM-YYYY hh:mm:ss').format();
    const numbers = body.numbers;

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
        return addVietlott(first_prize_id, second_prize_id, third_prize_id, jackpot_id, reward_id, bonus_day, numbers);
    })
    .then(function(vietlott) {
        util.response('', null, vietlott, res);
    })
    .catch(function(error) {
        util.response('failed', error_key.not_found, null, res);
    })
    .then(() => {
        Logger.logDebug('[END] Add new vietlott');
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
    function addVietlott(first_prize, second_prize, third_prize, jackpot, reward_id, bonus_day, numbers) {
        const vietlott = new Vietlott();
        vietlott.first_prize = first_prize;
        vietlott.second_prize = second_prize;
        vietlott.third_prize = third_prize;
        vietlott.jackpot = jackpot;
        vietlott.reward_id = reward_id;
        vietlott.bonus_day = bonus_day;
        vietlott.numbers = numbers;

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


});

router.put('/:vietlott_id', (req, res) => {
    Logger.logInfo('[BEGIN] update vietlott');
    const vietlott_id = req.params.vietlott_id;
    updateForCollection(vietlott_id, req.body)
    .then(vietlott => {
        util.response('', null, vietlott, res);
    })
    .catch(error => {
        console.log(error);
        util.response(error, error_key.not_found, null, res);
    })
    .then(() => {
        Logger.logInfo('[END] update vietlott');
    });

    function updateForCollection(vietlott_id, body) {
        return new Promise((resolve, reject) => {
    
            getVietlottById(vietlott_id)
            .then(vietlott => {
                
                if (!util.isNull(body.numbers)) {
                    vietlott.numbers = body.numbers;
                }
                if (!util.isNull(body.bonus_day)) {
                    vietlott.bonus_day = moment(body.bonus_day, 'DD-MM-YYYY hh:mm:ss').format();
                }
                if (!util.isNull(body.reward_id)) {
                    vietlott.reward_id = body.reward_id;
                }

                vietlott.save((error, object) => {

                    if (error) return reject(error);
                    return resolve(object);
                })
            })
            .catch(error => {
                reject(error);
            });

        });
    }

});

router.get('/:vietlott_id/reward', (req, res) => {

});

/**
 * Get lasted vietlott
 */
function getLastedVietlott() {
    return new Promise(function(resolve, reject) {

        Vietlott
        .findOne()
        .populate('first_prize second_prize third_prize jackpot')
        .sort({'bonus_day': -1})
        .exec(function(error, vietlott) {
            if (error) {
                reject(error);
            } else {
                resolve(vietlott);
            }
        });
        
    });
    
}

function getVietlottById(id) {
    return new Promise(function(resolve, reject) {

        Vietlott
        .findById(id)
        .populate('first_prize second_prize third_prize jackpot')
        .sort({'bonus_day': -1})
        .exec(function(error, vietlott) {
            if (error) {
                reject(error);
            } else {
                resolve(vietlott);
            }
        });
        
    });
    
}

module.exports = router;