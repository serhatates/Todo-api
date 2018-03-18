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
 *  [git push, push to github assume that we create repo on github before]
 * git push heroku master
 * heroku logs
 * git log
 * git diff , then hit Q to come back command prompt
 * 
 * heroku open, open url in default browser
 * 
 * ---after some changes to deploy heroku---
 * git status
 * git commit -am "some message"
 * git push heroku
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
 * 
 * ------create repo on github------
 * 
 * go github.com and create "New repository" => name "Todo-api"
 * git remote add origin https://github.com/serhatates/Todo-api.git
 * git push -u origin master
 * 
 */


const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 3000; // if PORT env not define on heroku simply gonna set 3000

const _ = require('underscore');

let todos = [],
    todoNextId = 1;

// const todos = [{
//     id: 1,
//     description: 'Meet gf for lunch',
//     completed: false
// },
// {
//     id: 2,
//     description: 'Go to market',
//     completed: false
// },
// {
//     id: 3,
//     description: 'Feed the cat',
//     completed: true
// }];

// Notice the new error argument
app.use(function (error, req, res, next) {
    // Check if the error is a SyntaxError
    if (error instanceof SyntaxError) {
        // Send back some custom error code and message
    } else {
        // No error? Continue on.
        next();
    }
});

/**
 *  Body parse let's you access JSON as a JavaScript object when using req.body.
 *  Without body parser, you'd have to manually parse the body to make it useful.
 * 
 *  Body parser will only parse the content if the Content-Type header is properly set.
 */

// app.use which lets us set up some middleware (app level)
app.use(bodyParser.json()); // now anytime req comes in express is going to parse it, and we re gonna be able to access via req.body

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
    let todoId = parseInt(req.params.id, 10);
    /* we gonna do it with underscore */
    // let mathcedTodo = todos.find((todo, i, arr) => {
    //     return todo.id === todoId; // any req parameters always string!, ***parseInt(string, base);
    // });
    let mathcedTodo = _.findWhere(todos, { id: todoId });

    // undefined is falsie you could use like that, object is truthy => if (undefined) falsie, if(object) truthy
    if (typeof mathcedTodo === 'undefined')
        return res.status(404).send();

    res.status(200).json(mathcedTodo);
});


// POST /todos
// we need to load body-parser module and it's an express middleware
app.post('/todos', (req, res) => {
    let body = _.pick(req.body, 'description', 'completed');

    // body validation with underscore lib
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0)
        return res.status(400).send(); // 400 means req can't be completed because of bad data was povided, BAD REQUEST

    body.description = body.description.trim();
    body = Object.assign({ id: todoNextId++ }, body);
    todos.push(body);

    res.status(200).json(body);
});

// DELETE /todos:id
app.delete('/todos/:id', (req, res) => {
    let todoId = parseInt(req.params.id, 10);

    // let mathcedTodo = todos.find((todo, i, arr) => {
    //     return todo.id === todoId; // any req parameters always string!, ***parseInt(string, base);
    // });

    // todos = todos.filter((todo, i, arr) => {
    //     return todo !== mathcedTodo;
    // });

    let mathcedTodo = _.findWhere(todos, { id: todoId });

    if (!mathcedTodo)
        return res.status(404).json({ "error": "no todo found with that id" });

    todos = _.without(todos, mathcedTodo);
    res.status(200).json(mathcedTodo);
});


app.listen(PORT, () => {
    console.log('Express listening on port: %i', PORT);
});
