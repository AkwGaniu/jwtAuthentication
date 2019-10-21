const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 200
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 225
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', userSchema)