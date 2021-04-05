const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db_manager = {};

db_manager.driver = mongoose;
db_manager.pangolin = require('./pangolin.model');

module.exports = db_manager;