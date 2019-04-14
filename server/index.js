const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const users = require('./users');
const barter = require('./barter');
const bodyParser = require('body-parser');
const passport = require('passport');
const SnapchatStrategy = require('passport-snapchat').Strategy;
const axios = require('axios');
const configFile = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 4);
app.use('/users',users);
app.use('/barter',barter);
app.use(require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: configFile.secret
  }));
app.use(passport.initialize());

passport.use(new SnapchatStrategy({
    clientID: configFile.clientID,
    clientSecret: configFile.clientSecret,
    callbackURL: 'http://localhost:3001/login/callback',
    profileFields: ['id','us', 'displayName', 'bitmoji'],
    scope: ['user.display_name', 'user.bitmoji.avatar'],
    pkce: true,
    state: true
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get('/login', passport.authenticate('snapchat'));

app.get('/login/callback',
  passport.authenticate('snapchat', { failureRedirect: '/login' }),
  function(request, response) {
    let url = 'http://localhost:3001/users/doesUserExist?displayName=' + request.user.id; 
    axios.get(url).then((data)=>{
      if(data.message == "true"){
        response.redirect('http://localhost:3000/?loggedIn=true&newUser=false');    
      }
      else{
        response.redirect('http://localhost:3000/?loggedIn=true&newUser=true');
      }
    });
  }
);

app.get('/',(request, response)=>{
    response.json({message : "Welcome to the Edunate API."});
})

app.listen(PORT, (request, response)=>{
    console.log('Live at',PORT);
})

