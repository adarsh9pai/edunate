const express = require('express');
const users = express.Router();
const Firestore = require('@google-cloud/firestore');

let fStore = new Firestore();

users.get('/',(request, response)=>{
    response.json({message : "users GET Endpoint"});
})

users.get('/doesUserExist',(request, response)=>{
    const userDocument = fStore.doc('Users/'+request.query.displayName);
    let doc = userDocument.get();
    if(Object.keys(doc).length == 0){
        response.json({message : false});
    }
    else{
        response.json({
            message : true
        })
    }
})

users.get('/getUser',(request, response)=>{
    const userDocument = fStore.doc('Users/'+request.query.displayName);
    let doc = userDocument.get();
    if(Object.keys(doc).length == 0){
        response.json({message : "user does not exist."});
    }
    else{
        response.json({
            message : "success",
            user : doc
        })
    }
})



module.exports = users;
