/**
 * Things to do;
 * 
 * git init
 * npm init
 * create .gitignore file and add node_modules/
 * add "express": "^4.16.2" in package.json dependencies
 * npm install
 * 
 * NOTE: heroku install node_modules/ according to package.json file, no need to carry them
 * 
 * ---heroku deploy---
 * heroku create,  makes new heroku app and adds a heroku git remote 
 * heroku rename xxx, rename the app it must be unique
 * 
 * git status
 * git add .
 * git status
 * git commit -am "Init repo"
 */

const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000; // if PORT env not define on heroku simply gonna set 3000

app.get('/', (req, res) => {
    res.send('Todo API ROOT');
});

app.listen(PORT, () => {
    console.log('Express listening on port: %i', PORT);
});



