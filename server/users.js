const express = require('express');
const users = express.Router();
const Firestore = require('@google-cloud/firestore');




let fStore = new Firestore();

users.get('/',(request, response)=>{
    response.json({message : "users GET Endpoint"});
})

users.get('/exists',(request, response)=>{
    let document = fStore.collection("Users").doc(request.query.displayName.split('/').join('_'));
    document.get().then((user)=>{
        if(user.exists){
            response.json({message : true});
        }
        else{
            response.json({message : false});
        }
    }).catch((error)=>{
        response.json({message :error.message });
    })
})

users.get('/get',(request, response)=>{
    let document = fStore.collection("Users").doc(request.query.displayName.split('/').join('_'));
    document.get().then((user)=>{
        if(user.exists){
            response.json({message : "success",
        user : user.data()});
        }
        else{
            response.json({message : "Failure. User not found."});
        }
    }).catch((error)=>{
        response.json({message : error.message});
        console.log(error.message);
    })    
})

users.post('/add', (request, response)=>{
    let documentObject = {
        displayName : request.body.displayName,
        bitmoji : request.body.bitmoji,
        fullName : request.body.fullName,
        age : request.body.age,
        university : request.body.university,
        major : request.body.major,
        classification : request.body.classification,
        location : request.body.location 
    };
    const document = fStore.doc('Users/' + documentObject.displayName.split('/').join('_')).set(documentObject)
    .then(() => {
        response.json({message : "success",
    description : "user has been added."})
    })
    .catch((error)=>{
        response.json({message : error.message });
    });
})


module.exports = users;
