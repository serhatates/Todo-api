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
That's why the todos array works even though it's not a good idea for real apps.
Node will keep variables around as long as the server is running! It won't reset the environment unless the server.js file gets restarted.

## npm cli 
npm outdated
npm update
 "underscore": "^1.8.3" => this little caret(^) means lets us update to more current version but only if it's a minor version. so if they release 1.8.4 we re gonna grab that update with npm instal, not 2.0.0  major changes can break app

##BONUS body-parser 
Using body parser globally is a pretty common pattern.
It's not expensive to add to all requests, and you probably also want to use body parser for PUT/PATCH requests in your app.

Defining it as app-wide middleware also makes your app easier to maintain and update instead of having to add it to all your POST/PUT/PATH requests.

Long story short, it's just easier and the module is smart enough to only parse a body when it's present.

## lodash vs underscore
They're both awesome libraries that make JavaScript better!

It's a give an take. Lo-dash has more functions to use, but weighs in at twice the size of underscore. 
This can hurt load times on the front-end (which I'll be covering in the future socket-io section).

If you find yourself wanting some of the extra functionality, you can easily switch to low-dash



