const mongoose = require('mongoose');

const Pangolin = mongoose.model("Pangolin", new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    family: String,
    race: String,
    food: String,
    friends: [String]
}));


module.exports = Pangolin;