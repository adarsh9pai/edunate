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

    const document = fStore.doc('Barter/' + newBarter.user.displayName + '-' + newBarter.id);
    document.set(newBarter).then(() => {
        response.json({message: "success", description: "barter has been added"});
    })
    .catch((error) =>
    {
        response.json({message: "Failure. Try again later."});
    });
});

barter.post('/update', (request, response) => {
    
     let updatedBarter = request.body;
     let document = fStore.collection("Barter").doc(updatedBarter.user.displayName + "-" + updatedBarter.id);
     document.set(updatedBarter).then(() => {
	response.json({message: "success"});
     })
     .catch((error) => {
	 response.json({message: "Error. Try again later."});
     });
    
});

/*  
    needs request.query.displayName, request.query.id
*/
barter.get('/get', (request, response) => {

        let document = fStore.collection("Barter").doc(request.query.displayName + "-" + request.query.id);
        document.get().then((barter) => {
            if(barter.exists)
                response.json(barter.data());
            else
                response.json({message: "instance of barter does not exist."})
        }).catch((error) =>{
            response.json({message: "Error. Try again later."});
        });
});

/*
    needs request.displayName
*/
barter.get('/getall', (request, response) => {

    let collection = fStore.collection("Barter");
    let result = [];
	
    collection.get().then((barters) => {
        barters.forEach((doc) => {
		if(doc.data().user['displayName'] == request.query.displayName)
		{
			result.push(doc.data());
		}
	});
        response.json({result});

    }).catch((error) => {
        response.json({message: "Error. Try again later."});
    });


});

let randomCode = max => {
    return Math.floor((Math.random() * max) + 1).toString(16).toUpperCase();
}

module.exports = barter;
