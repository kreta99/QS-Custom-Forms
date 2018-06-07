# Custom login, logout and error forms for Qlik Sense
Simple JavaScript application to customize login, logout and error forms in Qlik Sense. 
## Getting Started
Prepare your custom forms, follow deployment instruction and update Qlik Sense by executing one command. This extension keeps original forms unchanged, just imports new ones and changes some settings in Qlik Proxy, so you can easy restore default settings.
## Prerequisites
Qlik Sense November 2017 or above, Node.js with npm modules: request, fs  
## Installing
Install node.js and required modules: request and fs. Copy custom_forms.js to any directory. Make sure that custom_forms.js script can access Qlik Sense cerficates (line 5 with path), if not export them form QMC. Update variable hostname (line 10) if needed. 
## Using
Prepare you custom forms: login, logout and error based on attached html samples. You can also extract them from Qlik Sense using extract_orig_forms.js utility to get the latest versions.  If you want to redirec user after logout (for example in SSO scenarions) use logout with redirection sample. Each form must be one html file, so include all resources as css, js, images etc in html. Copy forms to the directory where custom_forms.js exists. This utility will read your html forms from following files: login_custom.html, logout_custom.html, error_custom.html, encode them and update Qlik Proxy properties. Open windows Power Shell as Administrator, go to folder with custom_forms.js and execute command: "node custom_forms". Use restore_org.js to go back to original Qlik Sense forms.
## Qlik Sense configuration
To enable login form, go to QMC, Virtual Proxy and change 'Windows authenctication pattern' to Form. 
