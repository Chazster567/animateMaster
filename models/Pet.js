//requires mongoose
var mongoose = require('mongoose');

//creates schema for adding a pet, pulls in user id to associate pets to accounts
const PetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String
    },
    age: {
        type: String
    },
    breed: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//exports pet as a mongoose model
module.exports = Pet = mongoose.model('pet', PetSchema);