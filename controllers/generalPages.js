const renderHomepage = (req, res) => {
    res.render('index', {
        title: 'Vacation Rentals, Homes, Experiences & Places - Airbnb',
        navColor: 'white'
    })
}

module.exports = {
    renderHomepage: renderHomepage,
}