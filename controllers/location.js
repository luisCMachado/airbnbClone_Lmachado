const Location = require('../models/location')

const searchLocationAll = (req, res) => {
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
}

const searchLocationHomes = (req, res) => {
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
}

module.exports = {
    searchLocationAll: searchLocationAll,
    searchLocationHomes: searchLocationHomes
}