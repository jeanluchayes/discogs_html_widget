//require('disconnect')
//require('express')

let accessDataP;
let requestDataP;

var Discogs = require('disconnect').Client;

//var discogs = new Discogs("DiscogsReleaseHTMLWidget/1.0", {
//	consumerKey: 'lkAgTInocxZZfKsTSasn', 
//	consumerSecret: 'tcBYdskqALSsLDENnoBBRxXtJWCgwboj'
//});

// var db = new Discogs("DiscogsReleaseHTMLWidget/1.0", {
// 	consumerKey: 'lkAgTInocxZZfKsTSasn', 
// 	consumerSecret: 'tcBYdskqALSsLDENnoBBRxXtJWCgwboj'
// }).database;

// var db = new Discogs().database;



// db.getRelease(176126, function(err, data){
// 	var url = data.images[0].resource_url;
// 	db.getImage(url, function(err, data, rateLimit){
// 		// Data contains the raw binary image data
// 		require('fs').writeFile('./image.jpg', data, 'binary', function(err){
// 			console.log('Image saved!');
// 		});
// 	});
// });


//var db = new Discogs().database();
//db.getRelease(176126, function(err, data){
	//console.log(data);
//});


const express = require('express');
const app = express();
const axios = require("axios");
var cors = require("cors");


const CLIENT_ID = 'lkAgTInocxZZfKsTSasn';
const CLIENT_SECRET = "tcBYdskqALSsLDENnoBBRxXtJWCgwboj";
const DISCOGS_URL = "https://api.discogs.com/oauth/access_token";


// app.use(cors({ credentials: true, origin: true }));

// app.get("/oauth/redirect", (req, res) => {
//   axios({
//     method: "POST",
//     url: `${DISCOGS_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
//     headers: {
//       Accept: "application/json",
//     },
//   }).then((response) => {
//     res.redirect(
//       `http://localhost:3000?access_token=${response.data.access_token}`
//     );
//   });
// });

// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(`Listening at port ${PORT}`);
// });







app.get('/authorize', function(req, res){
	var oAuth = new Discogs().oauth();
	oAuth.getRequestToken(
		'lkAgTInocxZZfKsTSasn', 
		'tcBYdskqALSsLDENnoBBRxXtJWCgwboj',
		'http://localhost:3000/callback',
		function(err, requestData){
			// Persist "requestData" here so that the callback handler can 
			// access it later after returning from the authorize url
            requestDataP = requestData
			res.redirect(requestData.authorizeUrl);
		}
	);
});

app.get('/callback', function(req, res){
	var oAuth = new Discogs(requestDataP).oauth();
	oAuth.getAccessToken(
		req.query.oauth_verifier, // Verification code sent back by Discogs
		function(err, accessData){
			// Persist "accessData" here for following OAuth calls
            accessDataP = accessData 
			res.send('Received access token!');
		}
	);
});

app.get('/identity', function(req, res){
	var dis = new Discogs(accessDataP);
	dis.getIdentity(function(err, data){
		res.send(data);
	});
});

var db = new Discogs(accessDataP).database();

db.getRelease(13930194, function(err, data){
	var url = data.images[0].resource_url;
	db.getImage(url, function(err, data, rateLimit){
		// Data contains the raw binary image data
		require('fs').writeFile('./image.jpg', data, 'binary', function(err){
			console.log('Image saved!');
		});
	});
});