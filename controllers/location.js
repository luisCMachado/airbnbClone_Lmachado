const db = require('../utilities/db/db')

module.exports.searchLocationAll = async (req, res) => {
    const city = req.params.location.toUpperCase();
    try {
        const location = await db.getFromDB('Location', {
            name: city
        })
        if (!location) {
            return res.send('location not found')
        }
        await location.populate('houses').execPopulate();
        res.render('search', {
            title: city,
            homes: location.houses,
            navColor: 'black'
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.searchLocationHomes = async (req, res) => {
    const city = req.params.location.toUpperCase();
    try {
        const location = await db.getFromDB('Location', {
            name: city
        })
        if (!location) {
            return res.send('location not found')
        }
        await location.populate('houses').execPopulate();
        res.render('search', {
            title: city,
            homes: location.houses,
            navColor: 'black'
        })
    } catch (err) {
        console.log(err)
    }
}