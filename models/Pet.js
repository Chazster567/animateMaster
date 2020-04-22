var mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
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

module.exports = Pet = mongoose.model('pet', PetSchema);