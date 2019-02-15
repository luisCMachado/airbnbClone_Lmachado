const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    title: String,
    beds: Number,
    price: Number,
    stars: Number,
    img: String,
    description: String
});

module.exports = mongoose.model('Home', homeSchema);