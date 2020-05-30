module.exports = function(app, passport) {
    // show the home page (will also have our login links)
  

    // HOME SECTION =========================
    app.get('/hmi', isLoggedIn, function(req, res) {
        res.render('hmi', {
            user : req.user
        });
    });

//=====================++++++++++++++++++++++++++++++++++++++++
    app.get('/history', isLoggedIn, function(req, res) {
        res.render('history.ejs', {
            user : req.user
        });
    });

//=====================++++++++++++++++++++++++++++++++++++++++
    app.get('/predict', isLoggedIn, function(req, res) {
        res.render('predict.ejs', {
            user : req.user
        });
    });


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // DATABASE TRẢ VỀ JSON

    // LOGIN ===============================
    // show the login form
    app.get('/', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/hmi', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
        
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
