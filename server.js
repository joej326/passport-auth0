const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');


const app = express();///////
app.use(bodyParser.json());/////

app.use(session({////
  secret: '32rujfu3ufwu893q'/////
}))/////
app.use(passport.initialize());/////MUST BE IN THIS ORDER OR IT WON'T WORK
app.use(passport.session());//////


passport.use(new Auth0Strategy({
  domain: 'joej326.auth0.com',
  clientID: '8Wyn0JnNALgWyn9MD75SmwEYGaDlgzAh',
  clientSecret: 'JdT06kCfZxQfHlbDx813THsbu7vJRQZ0DLOOprvlFBMwd5mCp-xmgh2wK_yUR-WR',
  callbackURL: '/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}));


app.get('/auth', passport.authenticate('auth0'));//'auth0' says what we want to use auth0 to login

app.get('/auth/callback', //this MUST match the 'callbackURL above'
passport.authenticate('auth0', {successRedirect: '/me'}), function(req,res){ //successRedirect is optional
  res.status(200).send(req.user);
})

passport.serializeUser(function(user,done){ //'done' works like 'next'
  return done(null,user); // codes to put on session!
});

passport.deserializeUser(function(user, done){ //decodes to put on req.user
  done(null, user);
});


app.get('/me', function(req,res){
  res.send(req.user);//req.user is built into passport
})





app.listen(8000,function(){
  console.log('I\'m ready...');
})
