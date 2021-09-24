import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloworld = functions.https.onRequest((request, response) => {
	functions.logger.info("hello logs!", {structureddata: true});
	response.send("hello from firebase!");
});
