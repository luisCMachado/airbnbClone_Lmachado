const Location = require('../models/location')
const Homes = require('../models/home')
const db = require('../utilities/db/db')

module.exports.renderHome = async (req, res) => {
    const id = req.params.id
    try {
        const home = await db.getFromDB('Home', {
            _id: id
        })
        await home.populate('host').execPopulate();
        await res.render('home', {
            title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
            navColor: 'black',
            home: home,
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.editHome = async (req, res) => {
    const id = req.params.id
    try {
        const home = await db.getFromDB('Home', {
            _id: id
        })
        await home.populate('host').execPopulate();
        await res.render('edit_home', {
            title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
            navColor: 'black',
            home: home,
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateHome = (req, res) => {
    Homes.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        beds: parseInt(req.body.beds),
        price: parseInt(req.body.price),
        img: req.body.img,
        stars: parseInt(req.body.stars),
        description: req.body.description
    }, function(err, model) {
        if (err) {
            return res.status(401).send(err);
        }
        res.status(200).send({
            status: "ok",
            redirect: `/rooms/${req.params.id}`,
        });
    })

}

module.exports.insertHome = (req, res) => {
    res.render('new_home', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        location: req.params.location.toUpperCase(),
        navColor: 'black'
    })
}

module.exports.createHome = async (req, res) => {
    const title = req.body.title;
    const beds = req.body.beds;
    const price = req.body.price;
    const img = req.body.imgUrl;
    const stars = req.body.stars;
    const description = req.body.description;
    try {
        const location = await db.getFromDB('Location', {
            name: req.params.location.toUpperCase()
        })

        if (location) {
            const newHome = await db.postToDB('Home', {
                title: title,
                beds: beds,
                price: price,
                img: img,
                stars: stars,
                description: description,
                host: req.user._id
            });

            await location.houses.push(newHome._id);
            await location.save();
            res.redirect(`/s/${req.params.location.toUpperCase()}/homes`)
        } else
            res.send('No result for that city')
    } catch (err) {
        console.log(err)
    }
}