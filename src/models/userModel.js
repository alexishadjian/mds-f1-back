const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', userSchema);