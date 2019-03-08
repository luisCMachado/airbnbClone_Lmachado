module.exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('autenticado')
        return next()
    }
    console.log('falhou')
   res.redirect('/');
}