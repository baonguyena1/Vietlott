const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enums = require('../config/enum');

var rewardSchema = new Schema({
    reward_type: {
        type: Number,
        default: enums.reward_type.THIRD_PRIZE
    }, 
    quantum: {
        type: Number,
        default: 0
    },
    prize_value:{
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

var Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;