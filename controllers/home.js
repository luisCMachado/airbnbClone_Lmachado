const Location = require('../models/location')
const Home = require('../models/home')


const renderHome = (req, res) => {
    const id = req.params.id
    Home.findById(id).exec((err, home) => {
        res.render('home', {
            title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
            navColor: 'black',
            home: home
        })
    })
}

const insertHome = (req, res) => {
    const title = req.body.title
    const price = req.body.price;
    const img = req.body.imgUrl;
    const description = req.body.description;
    Location.findOne({
        name: req.params.location.toUpperCase()
    }).then(location => {
        if (location) {
            const newHome = new Home({
                title: title,
                price: price,
                img: img,
                stars: 5,
                description: description
            });
            location.houses.push(newHome._id);
            newHome.save();
            location.save();
            res.redirect(`/s/${req.params.location.toUpperCase()}/homes`)
        } else
            res.send('No result for that query')
    })
}

module.exports = {
    renderHome: renderHome,
    insertHome: insertHome
}