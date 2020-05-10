//requires mongoose
var mongoose = require('mongoose');

//creates schema for adding a reminder, pulls in user id to associate reminders to accounts
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

//exports reminder as a mongoose model
module.exports = Reminder = mongoose.model('reminder', ReminderSchema);