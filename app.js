const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Location = require(__dirname + '/models/location')
const Home = require(__dirname + '/models/home')

let app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/airbnbV7');
app.set('view engine', 'ejs');
app.use(express.static('public'))

mongoose.connection.once('open', function () {
    console.log('connected')
    //     const rome = new Location({
    //         name: 'ROME',
    //         houses: [{
    //         title: 'Colosseum Dream Casa, Rome city center.',
    //         price: 69,
    //         img: 'https://a0.muscache.com/im/pictures/59275754/dda6841d_original.jpg',
    //         stars: 5,
    //         description: `Cozy, small, clean, beautiful! 
    //         Only a few steps away to the Colosseum and to the main monuments. 
    //         Located in a beautiful street full of shops, cafes, restaurants. 
    //         Just restored with the philosophy of the recovery of ancient materials.
    //         Please also give a look to next door apartment, 
    //         please search for: CUTE COLOSSEUM. Entire cozy central apartment.`
    //     },
    //     {
    //         title: 'Colosseum Loft',
    //         price: 55,
    //         img: 'https://a0.muscache.com/4ea/air/v2/pictures/ae327b04-5ed4-4017-84ba-4744ce5dc43e.jpg',
    //         stars: 4,
    //         description: `Luminoso silenzioso bilocale totalmente a disposizione degli ospiti, 
    //         con cucina e bagno proprio,
    //         situato nell 'attico di un palazzo dell'
    //         800,
    //         con ascensore.
    //         É il quartiere dei registi come P Sorrentino,
    //         M Garrone e Abel Ferrara,
    //         non invaso dai turisti.
    //         A 80 metri dalla principale metro(A),
    //         15 min.a piedi dal Colosseo e a 1 fermata della metro dalla Stazione Termini.
    //         3 supermercati a 90 metri,
    //         i famosi forni Roscioli e Panella,
    //         3 ottime trattorie e vinoteche e l 'incredibile pasticceria Regoli.`
    //     },
    //     {
    //         title: 'Elegant apartment, central & cheap',
    //         price: 42,
    //         img: 'https://a0.muscache.com/im/pictures/21911253/839008d6_original.jpg',
    //         stars: 5,
    //         description: `PLEASE VIEW THESE OTHER MY LISTINGS
    //         Deluxe apt 15 min walk to Colosseo
    //         https://www.airbnb.com/rooms/211507
    //         Cozy Quiet Gem, nice price 
    //         https://www.airbnb.com/rooms/1351207
    //         THANKS SO MUCH !!!`
    //     },
    //     {
    //         title: 'Pettinarihome 2 Campo dei Fiori',
    //         price: 89,
    //         img: 'https://a0.muscache.com/im/pictures/14143884/a9c58d2e_original.jpg',
    //         stars: 5,
    //         description: `This just under 600 sq ft apartment is located on the top, 4th floor of a small 17th century building, without elevator. The accommodation consists of one bedroom, one living room with sofa, kitchenette, fully equipped kitchen, bathroom and shower. The apartment is equipped with all modern conveniences, including satellite TV, internet, stereo, CD/DVD, independent heating, safe, washing machine, hairdryer, etc. This bright apartment is fitted with double-glazed windows, so it's very quiet. Breakfast is included in the price.`
    //     }
    // ]
    //     })
    //     rome.save()
}).on('error', function (error) {
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

app.get('/db', (req, res) => {
    Location.find().populate('houses').exec((err, locations) => {
        res.send(locations)
    })
})

app.get('/rooms/:id', (req, res) => {
    const id = req.params.id
    Home.findById(id).exec((err, home) => {
        res.render('home', {
            title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
            navColor: 'black',
            home: home
        })
    })

})

app.get('/:location/homes/new', function (req, res) {
    res.render('new_home', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        location: req.params.location.toUpperCase(),
        navColor: 'black'
    })
})

app.post('/:location/homes', function (req, res) {
    const title = req.body.title
    const price = req.body.price;
    const img = req.body.imgUrl;
    const description = req.body.description;
    Location.findOne({
        name: req.params.location.toUpperCase()
    }).then(result => {
        if (result) {
            const newHome = new Home({
                title: title,
                price: price,
                img: img,
                stars: 5,
                description: description
            });
            result.houses.push(newHome._id);
            newHome.save();
            result.save();
            res.redirect(`/s/${req.params.location.toUpperCase()}/homes`)
        } else
            res.send('No result for that query')
    })
})



app.get('/s/:location/all', function (req, res) {
    const city = req.params.location.toUpperCase();
    Location.findOne({
        name: req.params.location.toUpperCase()
    }).populate("houses").exec(function (err, location) {
        if (!location) {
            return res.send('location not found')
        }
        res.render('search', {
            title: city,
            homes: location.houses,
            navColor: 'black'
        })
    })
})

app.get('/s/:location/homes', function (req, res) {
    const city = req.params.location.toUpperCase();
    Location.findOne({
        name: req.params.location.toUpperCase()
    }).populate("houses").exec(function (err, location) {
        if (!location) {
            return res.send('location not found')
        }
        res.render('homes', {
            title: city,
            homes: location.houses,
            navColor: 'black'
        })
    })
})

app.get('/s/:city/experiences', function (req, res) {
    res.send(`Welcome to ${req.params.city} experiences`)

})