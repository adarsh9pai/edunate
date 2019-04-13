const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.set('json spaces', 4)

app.get('/',(request, response)=>{
    response.json({message : "Welcome to the Educate API."});
})

app.listen(PORT, (request, response)=>{
    console.log('Live at',PORT);
})

