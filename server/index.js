const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const users = require('./users');
const barter = require('./barter');

app.set('json spaces', 4);
app.use('/users',users);
app.use('/barter',barter);

app.get('/',(request, response)=>{
    response.json({message : "Welcome to the Edunate API."});
})

app.listen(PORT, (request, response)=>{
    console.log('Live at',PORT);
})

