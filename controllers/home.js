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
            csrfToken: req.csrfToken()
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
            csrfToken: req.csrfToken()
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateHome = (req, res) => {
    Homes.findByIdAndUpdate(req.params.id, {
        location: req.body.location,
        title: req.body.title,
        beds: parseInt(req.body.beds),
        price: parseInt(req.body.price),
        img: req.body.img,
        stars: parseInt(req.body.stars),
        description: req.body.description
    }, function(err, data) {
        if (err) {
            return res.status(401).send(err);
        }
        res.status(200).send({
            status: "ok",
            redirect: `/rooms/${req.params.id}`,
        });
    })

}


module.exports.deleteHome = (req, res) => {
    console.log('oladel')
    console.log(req.body)
    Homes.findByIdAndDelete(req.params.id, (err, data) => {
        db.Location.remove( {"_id": ObjectId("4d512b45cc9374271b02ec4f")});
        if (err) {
            return res.status(401).send(err);
        }
        res.status(200).send({
            status: "ok",
            redirect: `/s/${req.body.location}/homes`,
        });
    })

}

module.exports.insertHome = (req, res) => {
    res.render('new_home', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        location: req.params.location.toUpperCase(),
        navColor: 'black',
        csrfToken: req.csrfToken()
    })
}

module.exports.createHome = async (req, res) => {
    const houseLocation = req.body.location;
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
                location: houseLocation,
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