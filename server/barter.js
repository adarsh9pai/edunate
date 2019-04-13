const express = require('express');
const barter = express.Router();

barter.get('/',(request, response)=>{
    response.json({message : "barter GET Endpoint"});
})

module.exports = barter;