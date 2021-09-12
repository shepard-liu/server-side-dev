const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema);