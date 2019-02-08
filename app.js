const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Location = require(__dirname + '/models/location')

let app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/airbnbV5');
app.set('view engine', 'ejs');
app.use(express.static('public'))

mongoose.connection.once('open', function(){
    // const rome = new Location({
    //     name: 'Rome',
    //     houses: romeArr
    // })
    // rome.save()
}).on('error', function(error){
    console.log('Connection error:', error);
});



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.listen(port, () => console.log(`Server started on port ${port}!`));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        navColor: 'white'
    })
})

app.get('/home/new', function (req, res) {
    res.render('new_home', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        navColor: 'black'
    })
})

app.post('/home', function (req, res) {
    const title = req.body.title
    const price = req.body.price;
    const img = req.body.imgUrl;
    const description = req.body.description;
    rome.push({
        title: title,
        price: price,
        img: img,
        stars: 5,
        description: description,
    });
    res.redirect('/s/rome/homes')
})

app.get('/s/:city/all', function (req, res) {
    const city = req.params.city.toUpperCase();
    if (city === 'ROME') {
       return Location.find().then(result => {
            res.render('search', {
                title: city,
                homes: result[0].houses,
                navColor: 'black'
           })
        })
    }
    res.send('We found no results for that query')
})

app.get('/s/:city/homes', function (req, res) {
    const city = req.params.city.toUpperCase();
    res.render('homes', {
        title: city,
        homes: rome,
        navColor: 'black'
    })
})

app.get('/s/:city/experiences', function (req, res) {
    res.send(`Welcome to ${req.params.city} experiences`)

})