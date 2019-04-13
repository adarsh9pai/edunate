const express = require('express');
const barter = express.Router();
const Firestore = require('@google-cloud/firestore');

let fStore = new Firestore();

barter.get('/', (request, response) => {
    response.json({message: "barter GET Endpoint"});
});