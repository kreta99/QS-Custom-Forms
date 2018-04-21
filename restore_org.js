/********* Custom login, logout and error forms ************/
var fs = require('fs');
var request = require('request');

var dir_cert = "C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\";

var hostname = 'localhost'; //Qlik Sense host name

var options = {
	uri: 'https://' + hostname + ':4242/qrs/ProxyService?xrfkey=1234567891234567',
	headers: {'content-type': 'application/json',
			  'X-Qlik-xrfkey': '1234567891234567',
			  'X-Qlik-user': 'UserDirectory = Internal; UserId= sa_repository'},
	method: 'GET',
	json: true,
	ca: fs.readFileSync(dir_cert + "root.pem"),
	key: fs.readFileSync(dir_cert +"client_key.pem"),
	cert: fs.readFileSync(dir_cert +"client.pem"),
	rejectUnauthorized: false
};

//Get Proxy
request(options, function (error, response, body) {
	if(error){
		console.log("Error: " + error);
	}
	else{
		getProxyProp(body);
	}
});

//Get Proxy properties
function getProxyProp(body) {
	
	var proxyid = body[0].id;
	
	options.uri = 'https://' + hostname + ':4242/qrs/ProxyService/' + proxyid + '?xrfkey=1234567891234567';
	
	request(options, function (error, response, body) {
		if(error){
			console.log("Error: " + error);
		}
		else{
			setCustomForms(body);
		}
	});	
};

//Update forms
function setCustomForms(body){
	
	var proxyid = body.id;
	
	//set new base64 encoded forms in Proxy properties structure
	body.settings.formAuthenticationPageTemplate = "";
	body.settings.loggedOutPageTemplate = "";
	body.settings.errorPageTemplate = "";
	
	options.method = 'PUT';
	options.body = body;
	
	request(options, function (error, response, body) {
		if(error){
			console.log("Error: " + error);
		}
		else{
			console.log("***************Original login, logout and error forms restored***************");
		}
	});	
}
