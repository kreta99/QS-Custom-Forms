/********* Custom login, logout and error forms ************/
var fs = require('fs');
var request = require('request');

var dir_cert = "C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\";
var login_form_file = ".\\login_custom.html"; //file will be base64 encoded by this script!
var logout_form_file = ".\\logout_custom.html"; //file will be base64 encoded by this script!
var error_form_file = ".\\error_custom.html"; //file will be base64 encoded by this script!

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
	var login_form = fs.readFileSync(login_form_file);
	var logout_form = fs.readFileSync(logout_form_file);
	var error_form = fs.readFileSync(error_form_file);
	
	//set new base64 encoded forms in Proxy properties structure
	body.settings.formAuthenticationPageTemplate = Buffer(login_form).toString('base64');
	body.settings.loggedOutPageTemplate = Buffer(logout_form).toString('base64');
	body.settings.errorPageTemplate = Buffer(error_form).toString('base64');
	
	options.method = 'PUT';
	options.body = body;
	
	request(options, function (error, response, body) {
		if(error){
			console.log("Error: " + error);
		}
		else{
			console.log("***************Login, logout and error forms updated:***************");
		}
	});	
}
