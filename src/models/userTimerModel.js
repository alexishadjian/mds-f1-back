const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userTimerSchema = new Schema ({
    time: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
    }
});

module.exports = mongoose.model('UserTimer', userTimerSchema);