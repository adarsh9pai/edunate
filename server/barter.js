const express = require('express');
const barter = express.Router();
const Firestore = require('@google-cloud/firestore');
const MAX_CODE = 1000000;

let fStore = new Firestore();

barter.get('/', (request, response) => {
    response.json({message : "barter GET Endpoint"});
});

/*
    needs request.body.user, request.body.request, request.body.promise
    request.body.hashtags, request.body.dateEnd
*/
barter.post('/add', (request, response) =>
{

    let newBarter = {
        id: randomCode(MAX_CODE),
        user: request.body.user,
        received: [],
        request: request.body.request,
        promise: request.body.promise,
        hashtags: request.body.hashtags,
        isFulfilled: false,
        datePosted: new Date().toString(),
        dateEnd: request.body.dateEnd
    };

    console.log(newBarter);

    const document = fStore.doc('Barter/' + newBarter.displayName + '-' + newBarter.id);
    document.set(newBarter).then(() => {
        response.json({message: "success", description: "barter has been added"});
    })
    .catch((error) =>
    {
        response.json({message: "Failure. Try again later."});
    });
});

barter.post('/update', (request, response) => {
    
    //user
    //receive
    //request
    //promise
    //hashtags

    
});

/*  
    needs request.query.user, request.query.id
*/
barter.get('/get', (request, response) => {

        let document = fStore.collection("Barter").doc(request.query.user['displayName'] + "-" + request.query.id);
        document.get().then((barter) => {
            if(barter.exists)
                response.json(barter);
            else
                response.json({message: "instance of barter does not exist."})
        }).catch((error) =>{
            response.json({message: "Error. Try again later."});
        });
});

/*
    needs request.body.displayName
*/
barter.get('/getall', (request, response) => {

    let collection = fStore.collection("Barter");
    let result = [];

    collection.get().then((barters) => {
        
        for(let i = 0; i < barters.length; i++)
        {
            if(users[i]['user']['displayName'] == request.body.displayName)
            {
                result.append(baters[i]);
            }
        }

        response.json({result});

    }).catch((error) => {
        response.json({message: "Error. Try again later."});
    });


});

let randomCode = max => {
    return Math.floor((Math.random() * max) + 1).toString(16).toUpperCase();
}


