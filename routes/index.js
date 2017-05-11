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

router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect:'/login',
  failureFlash: true
}));

router.get('/', isLoggedIn, function(req, res, next){
  res.render('/', {username: req.user.local.username});
});

router.get('/reviews', isLoggedIn, function(req, res, next) {
  res.render('reviews');
});

router.get('/flavors', isLoggedIn, function(req, res, next){
  res.render('flavors')
});

router.get('mongodb://testing:testing@ds047865.mlab.com:47865/flower', isLoggedIn, function(req, res) {
  res.render('/reviews')
});

// router.post('/posts', isLoggedIn, function(req, res, next){
//   req.db.collection('allposts').insertOne(req.body, function(err) {
//     if (err) {
//       return next(err);
//     }
//     return res.redirect('/reviews')
//   })
// });

// Log out

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}
module.exports = router;
