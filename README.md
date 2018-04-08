---
## node.js 
 Node.js is single threaded, and all requests coming into the server are going to be using the same instance of the server.

 The current app is only insecure because we're going over the basics of the requests.
In the next couple of sections we'll be adding security so someone can't simply make a request and view someone else's data!

 Node.js using non-blocking I/O so it can handle a ton of requests on one thread. 
If request 1 makes a call to the database, Node.js can start processing request 2, 3, and 4.
When request 1s database call is all done, it can send the response back to the HTTP caller.

 The requests are going to be processed in the order in which they were received, but that does not mean they will be responded to in the order in which they were received. 
Every time a request makes an I/O call to something like a database or 3rd party API, it gives up control to someone else.

Node is single threaded and handles all requests (in this case HTTP requests) in the same environment. 
That's why the 'todos' array works even though it's not a good idea for real apps.
Node will keep variables around as long as the server is running! It won't reset the environment unless the server.js file gets restarted.

## npm cli 
npm outdated
npm update
 "underscore": "^1.8.3" => this little caret(^) means lets us update to more current version but only if it's a minor version. so if they release 1.8.4 we re gonna grab that update with npm instal, not 2.0.0  major changes can break app

## BONUS body-parser 
Using body parser globally is a pretty common pattern.
It's not expensive to add to all requests, and you probably also want to use body parser for PUT/PATCH requests in your app.

Defining it as app-wide middleware also makes your app easier to maintain and update instead of having to add it to all your POST/PUT/PATH requests.

Long story short, it's just easier and the module is smart enough to only parse a body when it's present.

## lodash vs underscore
They're both awesome libraries that make JavaScript better!

It's a give an take. Lo-dash has more functions to use, but weighs in at twice the size of underscore. 
This can hurt load times on the front-end (which I'll be covering in the future socket-io section).

If you find yourself wanting some of the extra functionality, you can easily switch to low-dash

## array remove item
The bigger issue has to do with object identity in JavaScript. 
Two objects with the same properties are not equal. Because references(memory adresses) are different.
For example:

var a = {};
var b = {};
 
console.log(a === b); // Will print false

This same things is preventing splice or indexOf from finding the object. 
For example:

var a = [{}];
 
console.log(a.indexOf({})); // Will print -1

## update object
Our matchedTodo variable refers to the same object we have in our todos array. 
When an attribute is updated on matchedTodo, the change is also visible on the object in the todos array.

It's important to note that if we set the matchedTodo variable to something else (like a string), that would not update what we see in the todos array. 
So adding matchedTodo = 'something'; does not update the todos array.

It's only when an attribute on the object is updated that we see the change in the array too. Here's two examples:

var obj = {name: 'Andrew'}

function willNotChange(someObject) {

someObject = 'test'

}

willNotChange(obj);

console.log(obj); // You'll see {name: 'Andrew'}

In this case we try to update someObject. It does not change the obj variable. Here's the second example:

var obj = {name: 'Andrew'}

function willChange(someObject) {

someObject.name = "Minh";

}

willChange(obj)

console.log(obj); // You'll see {name: 'Minh'}

In this second example, we simply update an attribute on someObject and that change is also visible in the original object, obj.


## PUT POST PATCH
FYI -- although it's commonplace to map POST and PUT from HTTP to CREATE and UPDATE from the CRUD acronym, it isn't technically correct. 
That's because RFC 2616 doesn't include anything that precisely matches the semantics of "update". 
According to the HTTP standard, "PUT" requests should be "idempotent" -- that is to say if you call it more than once with the same parameters and body the result should be the same.

If you think about it, it means that the kind of piece-wise updating you're doing here with PUT violates the HTTP standard. 
For example suppose I issue the following requests

1 PUT /todos/3 {description "x", completed: false}

2 PUT /todos/3 {completed: true}

3 PUT /todos/3 {description: "y", completed: false}

4 PUT /todos/3 {completed: true}

Now according to RFC 2616 the resource at /todos/3 should be the same after call #4 as after call #2 because PUT is idempotent; but of course it won't be because the description has changed from "x" to "y".

Now, will there be any problems with treating "PUT" as we have here? 
Usually not, but if there is a proxy server between the client and node server, the proxy server MIGHT serve #4 out of the cache, in which case the node server would never get the instruction to update "y" to completed.

The emergence of RESTful APIs pointed to the need for a true "Update" function in HTTP. 
That need is addressed by RFC 5789, which adds a "PATCH" method to HTTP. PATCH is similar to PUT except that it is NOT idempotent. 
"PATCH" is also fully supported by Node and postman, so you can fix your program by simply replacing app.put(...) with app.patch(...).

To summarize the best practices are:

1) Use POST when you're adding a new resource but want to let the server assign an address/id to that resource.

2) Use PUT to add or COMPLETELY REPLACE a resource at a specified URI. You CAN update objects using PUT, provided that you provide every value of the given resource in the request.

3) Use PATCH to update part of a resource at a given URI.

There are two more wrinkles with PATCH. The first is that the server MUST make all the updates in the PATCH or none of them (in which case it should return a failure code). 
The second is that you're supposed to avoid conflicting patches from different clients. 
The client "SHOULD" do this by sending some kind of object version identifier like an Etag header so the server can reject an update if it would result in two clients having conflicting notions of what the resource looks like.

Probably the safest policy is to use PUT with complete representations, although of course that can also result in clients having different ideas of what a resource like todo/3 looks like.

##Query parameter comes at the end of your url  => {{url}}/todos?key=value
you can have as many query parameters as you want
=> {{url}}/todos?key=value&anotherKEy=anotherValue
and get this queries from "req.query", important thing parameters values are string  e.g. bool is not bool type !



