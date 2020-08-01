## Blog-Website
Application to post Blogs for Maintaining Daily Journal. 

## Features
* Provision to use EJS to render templates/ dynamic HTML
* Uses MongoDB to store the Daily Blogs.
* [Compose](http://localhost:3000/compose) gives a provision to Create new blogs after a successful setup.

## Setup Instructions
* Download or clone the repo
* Open console in root directory
* Do npm i OR npm install to install dependencies
* Create and use .env file as needed

## To use EJS:
* Do npm i ejs to install EJS package
* Uncomment or Add in server.ts:
* server.engine('.html',require('ejs').renderFile);
* server.set('view engine', 'html');
* Serve static content, Dynamic HTML/EJS templates, etc. from /public folder

## Scripts
node app.js to run the application
