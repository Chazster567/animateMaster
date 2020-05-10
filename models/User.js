//requires mongoose
var mongoose = require('mongoose');

//creates schema for adding a user
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//exports user as a mongoose model
module.exports = User = mongoose.model('user', UserSchema);