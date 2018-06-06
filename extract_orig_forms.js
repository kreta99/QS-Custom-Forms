var fs = require("fs");
var htmlarr;
var counter;

fs.readFile("C:\\Program Files\\Qlik\\Sense\\Proxy\\proxy.exe", "utf-8", function (err, data) {
    if (err) throw err;
	//console.log(typeof(data));
	counter = (data.match(/!doctype html/g) || []).length;
	console.log('proxy.exe contains ' + counter + ' html pages');
	htmlarr = data.split('<!doctype html>'); //.pop().split('</html>').shift();
	for (var i = 0; i < htmlarr.length; i++) {
		if (htmlarr[i].indexOf('</html>') > 0) {
			var out = '<!doctype html>' + htmlarr[i].split('</html>')[0] + '</html>';
			var mod_html = '';
			var filename1 = "unknown_form" + i + ".html";
			var filename2 = '';

			if (out.indexOf('<title>[0]') >= 0) {
				filename1 = 'error_orig.html';
				filename2 = 'error_automodified.html';
				mod_html = out
					.replace('href="data:image/x-icon', 'ignorehref="data:image/x-icon')
					.replace('<div class="qlik-logo">', '<div class="qlik-logo" style="display:none;">');
			} else if (out.indexOf('<title>%%proxy_defaultmodules_user_logged_out_page') >= 0) {
				filename1 = 'logout_orig.html';
				filename2 = 'logout_automodified.html';
				mod_html = out
					.replace('href="data:image/x-icon', 'ignorehref="data:image/x-icon')
					.replace('<div class="qlik-logo">', '<div class="qlik-logo" style="display:none;">')
					.replace('<div class="background left-qlik-background"', '<div class="background left-qlik-background" style="display:none;"')
					.replace('<hr />', '<!-- <hr /> -->');
					
			} else if (out.indexOf('<title>%%proxy_defaultmodules_authentication_form') >= 0) {
				filename1 = 'login_orig.html';
				filename2 = 'login_automodified.html';
				mod_html = out
					.replace('href="data:image/x-icon', 'ignorehref="data:image/x-icon')
					.replace('<div class="qlik-logo"', '<div class="qlik-logo" style="display:none;"')
					.replace('<div class="background left-qlik-background"', '<div class="background left-qlik-background" style="display:none;"')
					.replace('<hr />', '<!-- <hr /> -->');
			} 
			console.log(filename1);
			fs.writeFile(filename1, out, function(err) {
				if(err) { return console.log(err); }
			}); 
			if (mod_html.length) {
				console.log(filename2);
				fs.writeFile(filename2, mod_html, function(err) {
					if(err) { return console.log(err); }
				}); 
			}
		};
	}
});
