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
 * ---------heroku deploy---------
 * heroku create,  makes new heroku app and adds a heroku git remote 
 * heroku rename xxx, rename the app it must be unique
 * 
 * git status
 * git add .
 * git status
 * git commit -am "Init repo"
 * git push heroku master
 * heroku logs
 * git log
 * git diff , then hit Q to come back command prompt
 * 
 * ---some tricky parts---
 * git remote -v, see all apps
 * "start": "node server.js" => to your scripts in package.json. Heroku simply doesn't know what file is the entry point to your app! 
 * if you want to heroku to use different node, you need to add;
 * {
 * Other package.json props...
 * "engines": {
 *   "node": "x.x.x"
 * }
 *}
 *
 * Pushing to Git first then to Herou is simply a product of habit. You don't need to push to GitHub first (or even use it at all) to push and deploy to Heroku.
 */

const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000; // if PORT env not define on heroku simply gonna set 3000

const todos = [{
    id: 1,
    description: 'Meet gf for lunch',
    completed: false
},
{
    id: 2,
    description: 'Go to market',
    completed: false
},
{
    id: 3,
    description: 'Feed the cat',
    completed: true
}];

app.get('/', (req, res) => {
    res.send('Todo API ROOT');
});

// GET /todos
app.get('/todos', (req, res) => {
    // we can only pass text back and forth so need to convert json string
    res.status(200).json(todos);
});


// GET /todos/:id    => : represent var(id) that's gonna passed in, that's what exactly express uses to parse data coming in
app.get('/todos/:id', (req, res) => {
    let mathcedTodo = todos.find((todo, i, arr) => {
        return todo.id === parseInt(req.params.id, 10); // any req parameters always string!, ***parseInt(string, base);
    });

    console.log('found %o', mathcedTodo);

    // undefined is falsie you could use like that, object is truthy => if (undefined) falsie, if(object) truthy
    if (typeof mathcedTodo === 'undefined')
        return res.status(404).send();

    res.status(200).json(mathcedTodo);
});


app.listen(PORT, () => {
    console.log('Express listening on port: %i', PORT);
});



