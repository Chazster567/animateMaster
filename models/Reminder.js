var mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    pet: {
        type: String
    },
    event: {
        type: String
    },
    time: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Reminder = mongoose.model('reminder', ReminderSchema);