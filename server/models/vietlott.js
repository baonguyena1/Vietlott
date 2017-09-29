const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var vietlottSchema = new Schema({
    first_prize: {
        type: Schema.Types.ObjectId,
        ref: 'Reward'
    },
    second_prize: {
        type: Schema.Types.ObjectId,
        ref: 'Reward'
    },
    third_prize: {
        type: Schema.Types.ObjectId,
        ref: 'Reward'
    },
    jackpot: {
        type: Schema.Types.ObjectId,
        ref: 'Reward'
    },
    reward_id: {
        type: String,
        default: ''
    },
    bonus_day: {
        type: Date,
        default: Date.now
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

var Vietlott = mongoose.model('Vietlott', vietlottSchema);
module.exports = Vietlott;