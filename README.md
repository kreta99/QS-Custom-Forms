# Custom login, logout and error forms for Qlik Sense
Simple JavaScript application to replace login, logout and error forms in Qlik Sense. 
## Getting Started
Prepare you custom forms based on attached samples, follow deployment instruction and update Qlik Sense by executing one command.
## Prerequisites
Qlik Sense November 2017 or above, Node.js with npm modules: request, fs  
## Installing
Install node.js. Copy custom_forms.js to any directory. Make sure that custom_forms.js script can access Qlik Sense cerficates (line 5 with path), if not export them form QMC. Update variable hostname (line 10) if needed. 
## Using
Prepare you custom forms: login, logout and error. If you want to redirec user after logout (for example in SSO scenarions) use logout with redirection sample. Each form must be one html file, so include all resources as css, js, images etc in html. Copy forms to the directory where custom_forms.js exists. Open windows Power Shell as Administrator, go to folder with custom_forms.js and execute command: "node custom_forms". This utility will read your html forms from following files: login_custom.html, logout_custom.html, error_custom.html, encode them and update Qlik Proxy properties.
## Qlik Sense configuration
To enable login form, go to QMC, Virtual Proxy and change 'Windows authenctication pattern' to Form. 
