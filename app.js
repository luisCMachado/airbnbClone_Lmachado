const express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Location = require('./models/location'),
    passport = require("passport"),
    User = require("./models/user.js"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session"),
    app = express(),
    port = (process.env.PORT || 3000),
    homeRoutes = require('./routes/home'),
    locationRoutes = require('./routes/location'),
    generalPagesRoutes = require('./routes/generalPages'),
    register = require('./routes/auth'),
    login = require('./routes/auth'),
    csrf = require('csurf'),
    cookieParser = require('cookie-parser'),
    profileRoutes = require('./routes/generalPages');


app.use(helmet())
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/airbnbV12', {
    useNewUrlParser: true
});

mongoose.connection.once('open', function () {
            const rome = new Location({
            name: 'ROME',
            houses: []
            });
        rome.save();
    console.log('connected')
}).on('error', function (error) {
    console.log('Connection error:', error);
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(expressSession({
    secret: "7GQyKbjLYIS/5F{abW2`3UW{T92az!Lu`sKYl2GO5;XI^$V{ryrG[03N5D0WbO8",

    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(port, () => console.log(`Server started on port ${port}!`));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


app.use(generalPagesRoutes)
app.use(homeRoutes)
app.use(locationRoutes)
app.use(register)
app.use(login)
app.use(profileRoutes)