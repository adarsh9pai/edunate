const express = require('express');
const users = express.Router();

users.get('/',(request, response)=>{
    response.json({message : "users GET Endpoint"});
})

module.exports = users;
