const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    }
});

var Test = mongoose.model('Test', TestSchema);
module.exports = Test;