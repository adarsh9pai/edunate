const express = require('express');
const users = express.Router();
const Firestore = require('@google-cloud/firestore');




let fStore = new Firestore();

users.get('/',(request, response)=>{
    response.json({message : "users GET Endpoint"});
})

users.get('/doesUserExist',(request, response)=>{
    let document = fStore.collection("Users").doc(request.query.displayName);
    document.get().then((user)=>{
        if(user.exists){
            response.json({message : true});
        }
        else{
            response.json({message : false});
        }
    }).catch((error)=>{
        response.json({message : "Error. Try again later."});
    })
})

users.get('/getUser',(request, response)=>{
    let document = fStore.collection("Users").doc(request.query.displayName);
    document.get().then((user)=>{
        if(user.exists){
            response.json({message : "success",
        user : user.data()});
        }
        else{
            response.json({message : "Failure. User not found."});
        }
    }).catch((error)=>{
        response.json({message : "Error. Try again later."});
    })    
})

users.post('/addUser', (request, response)=>{
    let documentObject = {
        displayName : request.body.displayName,
        bitmoji : request.body.bitmoji,
        fullName : request.body.fullName,
        age : request.body.age,
        university : request.body.university,
        major : request.body.major,
        classification : request.body.classification,
        city : request.body.city 
    };
    const document = fStore.doc('Users/' + documentObject.displayName).set(documentObject)
    .then(() => {
        response.json({message : "Success",
    description : "user has been added."})
    })
    .catch((error)=>{
        response.json({message : "Failure. Try again later."});
    });
})


module.exports = users;
