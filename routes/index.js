var express = require('express');
var router = express.Router();
var passport= require('passport');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Game Flavor' });
});

router.get('/signup', function(req, res, next){
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/', isLoggedIn, function(req, res, next){
  res.render('/', {username: req.user.local.username});
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}
module.exports = router;
