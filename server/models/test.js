const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestSchema = new Schema({
    name: {
        type: Number,
        default: 0
    },
    age: {
        type: Number,
        default: 0
    }
});

var Test = mongoose.model('Test', TestSchema);
module.exports = Test;