const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,
    houses: Array
});

module.exports = mongoose.model('Location', LocationSchema);