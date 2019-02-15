const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,
    houses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home"
    }]
});

module.exports = mongoose.model('Location', LocationSchema);