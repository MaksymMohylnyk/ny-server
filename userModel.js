'use strict';
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    "name": {
        type: String,
        require: [true, "User number is required"]
    },
    "tasks": {
        type: [Number]
    }
})

module.exports = mongoose.model('users', userSchema);