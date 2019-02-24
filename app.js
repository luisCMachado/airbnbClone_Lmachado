const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let app = express();
const port = process.env.PORT || 3000;

const homeRoutes = require ('./routes/home')
const locationRoutes = require ('./routes/location')
const generalPagesRoutes = require ('./routes/generalPages')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/airbnbV7',  { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'))

mongoose.connection.once('open', function () {
    console.log('connected')
}).on('error', function (error) {
    console.log('Connection error:', error);
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.listen(port, () => console.log(`Server started on port ${port}!`));

app.use(generalPagesRoutes)
app.use(homeRoutes)
app.use(locationRoutes)