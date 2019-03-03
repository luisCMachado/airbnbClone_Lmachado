

module.exports.renderHomepage = (req, res) => {
    res.render('index', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        navColor: 'white',
        csrfToken: req.csrfToken()
    })
}

module.exports.renderProfile = (req, res) => {
    res.render('profile', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        navColor: 'black',
        csrfToken: req.csrfToken()
    })
}