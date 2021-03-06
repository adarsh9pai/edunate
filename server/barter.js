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
        datePosted: (new Date().toJSON().slice(0,10)).split('_').join('/'),
        dateEnd: request.body.dateEnd
    };

    newBarter.user.displayName = newBarter.user.displayName.split('/').join('_');

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
     updatedBarter.isFulfilled = isFulfilled(updatedBarter);
     let document = fStore.collection("Barter").doc(updatedBarter.user.displayName.split('/').join('_') + "-" + updatedBarter.id);
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

        let document = fStore.collection("Barter").doc(request.query.displayName.split('/').join('_') + "-" + request.query.id);
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
		if((!request.query.displayName) || (doc.data().user['displayName'].split('/').join('_') == request.query.displayName.split('/').join('_')))
		{
			result.push(doc.data());
		}
		return null;
	});
        response.json({result});

    }).catch((error) => {
	console.log(error.message);
        response.json({message: "Error. Try again later."});
    });


});

barter.get('/trending', (request, response) => {
	
	let collection = fStore.collection("Barter");
	let hashtags = {};

	collection.get().then((barters) => {
		barters.forEach((doc) => {
			for(let i = 0; i < doc.data().hashtags.length; i++)
			{
				if(!(doc.data().hashtags[i] in hashtags))
					hashtags[doc.data().hashtags[i]] = 0;
				hashtags[doc.data().hashtags[i]]++;
			}
		});
		let sorted = Object.keys(hashtags).sort((a,b) => {return hashtags[b] - hashtags[a]});
		response.json({hashtags: sorted});
	})
	.catch((error) => {
		response.json({message: error.message});
	});

});

let isFulfilled = post => {

	if(post.request.type == 'money')
	{
	
		let receivedSum = 0.0;

		for(let i = 0; i < post.received.length; i++)
		{
			receivedSum += (parseFloat(post.received[i].payment) * parseFloat(post.received[i].frequency));
		}
		return receivedSum >= parseFloat(post.request.description);
	}
	else
	{
		return true;
	}

}

let randomCode = max => {
    return Math.floor((Math.random() * max) + 1).toString(16).toUpperCase();
}

module.exports = barter;
