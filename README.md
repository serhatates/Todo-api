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

## npm cli 
npm outdated
npm update

##BONUS body-parser 
Using body parser globally is a pretty common pattern.
It's not expensive to add to all requests, and you probably also want to use body parser for PUT/PATCH requests in your app.

Defining it as app-wide middleware also makes your app easier to maintain and update instead of having to add it to all your POST/PUT/PATH requests.

Long story short, it's just easier and the module is smart enough to only parse a body when it's present.



