const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    location: String,
    title: String,
    beds: Number,
    price: Number,
    stars: Number,
    img: String,
    description: String,
    host: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model('Home', homeSchema);