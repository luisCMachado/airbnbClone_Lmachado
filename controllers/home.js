const db = require('../utilities/db/db')

module.exports.renderHome = async (req, res) => {
    const id = req.params.id
    try {
        const home = await db.getFromDB('Home', {
            _id: id
        })
        res.render('home', {
            title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
            navColor: 'black',
            home: home
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.insertHome = (req, res) => {
    res.render('new_home', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        location: req.params.location.toUpperCase(),
        navColor: 'black'
    })
}

module.exports.createHome = async (req, res) => {
    const title = req.body.title
    const price = req.body.price;
    const img = req.body.imgUrl;
    const description = req.body.description;
    try {
        const location = await db.getFromDB('Location', {
            name: req.params.location.toUpperCase()
        })

        if (location) {
            const newHome = await db.postToDB('Home', {
                title: title,
                price: price,
                img: img,
                stars: 5,
                description: description
            });

            location.houses.push(newHome._id);

            location.save();

            res.redirect(`/s/${req.params.location.toUpperCase()}/homes`)
        } else
            res.send('No result for that city')
    } catch (err) {
        console.log(err)
    }
}