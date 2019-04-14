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
const stripe = require('stripe')(configFile.secret_key);
const Firestore = require('@google-cloud/firestore');
const MAX_CODE = 1000000;

let fStore = new Firestore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
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
    profileFields: ['id', 'displayName', 'bitmoji'],
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
    let url = 'http://localhost:3001/users/exists?displayName=' + request.user.id; 
    console.log(request.user);
    axios.get(url).then((data)=>{
      if(data.message == "true"){
        response.redirect('http://localhost:3000/?loggedIn=true&newUser=false'+ '&bitmoji=' + request.user.bitmoji.avatarUrl + '&id=' + request.user.id);    
      }
      else{
        response.redirect('http://localhost:3000/?loggedIn=true&newUser=true'+ '&bitmoji=' + request.user.bitmoji.avatarUrl + '&id=' + request.user.id);
      }
    }).catch(error=>{
      response.json({message : "Error. Try again later."})
    });
  }
);

app.get('/',(request, response)=>{
    response.json({message : "Welcome to the Edunate API."});
})

app.listen(PORT, (request, response)=>{
    console.log('Live at',PORT);
})

app.post('/charge', async(request, response)=>{
  let account = '';
  try{
    let {status} = await stripe.charges.create({
      amount : 300,
      currency : "usd",
      description : 'example',
      source : request.body
    });
    response.json({message : 'success'});
  }
  catch(error){
    console.log(error.message);
    response.status(500).end();
  }

})

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000');
});