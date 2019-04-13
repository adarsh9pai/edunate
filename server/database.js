const Firestore = require('@google-cloud/firestore');
async function main() {
	    const firestore = new Firestore();

	    const document = firestore.doc('posts/intro-to-firestore');
	    console.log('Document created');

	    await document.set({
		          title: 'Welcome to Firestore',
		          body: 'Hello World',
		        });
	    console.log('Entered new data into the document');

	    await document.update({
		          body: 'My first Firestore app',
		        });
	    console.log('Updated an existing document');


	    let doc = await document.get();
	    console.log('Read the document');

	    //await document.delete();
	    //console.log('Deleted the document');

};

main().catch(console.error);
