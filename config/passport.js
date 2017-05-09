var LocalStrategy = require('passport-local');
var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.fillById(id, function(err, user){
            done(err,user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
        usernamefield: 'username',
        passwordfield: 'password',
        passRegToCallback: true
    }, function(req, username, password, done){
        process.nextTick(function(){
          User.findOne({ 'local.username' : username }, function(err, user){
              if (err) { return done(err); }
              if (user) {
                  return done(null, false, req.flash('signupMsg', 'This username is taken'));
              }
              var newUser = new User();
              newUser.local.username = username;
              newUser.local.password = newUser.generateHash(password);
              newUser.save(function(err){
                  if (err) { return done(err); }
                  return done(null, newUser)
              })
          })
        })
    }));

    passport.use('local-login', new LocalStrategy());
};