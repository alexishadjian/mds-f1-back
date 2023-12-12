const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userTimerSchema = new Schema ({
    time: {
        type: Number,
        required: true
    },
    id_user: {
        type: String,
    }
});

module.exports = mongoose.model('UserTimer', userTimerSchema);