# Backend

Create a new template for our application with the `npm init` command.

This will create the package.json file (npm is part of the node ecosystem).

Add a script to the scripts tag.

```
{
  // ...
  "scripts": {

    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

Now we can run `npm start` to execute `node index.js`

By default, the package.json file also defines another commonly used npm script called npm test. Since our project does not yet have a testing library, the npm test command simply executes the following command

```
echo "Error: no test specified" && exit 1
```

- Simple Web Server

```javascript
const http = require("http");

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

These days, code that runs in the browser uses ES6 modules. Modules are defined with an export and taken into use with an import.

However, Node.js uses so-called CommonJS modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification. Node supports now also the use of ES6 modules, but since the support is not quite perfect yet, we'll stick to CommonJS modules.

```
const http = require('http') // CommonJS
import http from 'http' // ES6
```

- Serving JSON

```javascript
const http = require("http");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

- Express

The most popular backend framework (library) for Node is Express.js.

```
npm install express
```

We can update deps with:

```
npm update
```

Likewise, if we start working on the project on another computer, we can install all up-to-date dependencies of the project defined in package.json by running this next command in the project's root directory:

```
npm install
```

Backend server example with Express.

```javascript
const express = require("express");
const app = express();

let notes = [
  ///...
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

The event handler function accepts two parameters. The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.

In our code, the request is answered by using the send method of the response object. Calling the method makes the server respond to the HTTP request by sending a response containing the string <h1>Hello World!</h1> that was passed to the send method. Since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html. The status code of the response defaults to 200.

Express automatically sets the Content-Type header with the appropriate value of application/json when using the response.json() function.

Without Express we have to transform the data into the JSON format with the JSON.stringify method.

- Nodemon

`npm install --save-dev nodemon` to restart the server on changes. To start it we will use `npm run dev` by adding a script in
package.json.

```
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js", // added for running nodemon in dev
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```

- Fetching a single resource

Use the colon syntax in Express (:id) like most frameworks/libraries where we have dynamic paths.
In other libraries it can be {id} as well (i.e. Spring in Java).

```javascript
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id); // need to cast to Number because params are strings
  const note = notes.find((note) => note.id === id);

  // undefined is falsy meaning that it will evaluate to false.
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
```

- Deleting resources

Testable with Postman or cURL.

```javascript
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});
```

- Receiving data

To access the data easily, we need the help of the express json-parser that we can use with the command app.use(express.json()).

Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.

```javascript
const express = require("express");
const app = express();

app.use(express.json());

//...

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  // If the received data is missing a value for the content property,
  // the server will respond to the request with the status code 400 bad request:
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // a note object is built using the body of the request, otherwise
  // if we rely on the request body alone we could add notes with missing keys
  // or with additional keys
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
```

- HTTP request types

The HTTP standard talks about two properties related to request types, safety and idempotency.

The HTTP GET request should be safe:

    In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".

Safety means that the executing request must not cause any side effects on the server. By side effects, we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.

Nothing can ever guarantee that a GET request is safe, this is just a recommendation that is defined in the HTTP standard. By adhering to RESTful principles in our API, GET requests are always used in a way that they are safe.

The HTTP standard also defines the request type HEAD, which ought to be safe. In practice, HEAD should work exactly like GET but it does not return anything but the status code and response headers. The response body will not be returned when you make a HEAD request.

All HTTP requests except POST should be idempotent:

    Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property

This means that if a request does not generate side effects, then the result should be the same regardless of how many times the request is sent.

If we make an HTTP PUT request to the URL /api/notes/10 and with the request we send the data { content: "no side effects!", important: true }, the result is the same regardless of how many times the request is sent.

Like safety for the GET request, idempotence is also just a recommendation in the HTTP standard and not something that can be guaranteed simply based on the request type. However, when our API adheres to RESTful principles, then GET, HEAD, PUT, and DELETE requests are used in such a way that they are idempotent.

POST is the only HTTP request type that is neither safe nor idempotent. If we send 5 different HTTP POST requests to /api/notes with a body of {content: "many same", important: true}, the resulting 5 notes on the server will all have the same content.

- Middleware

The express json-parser is a type of middleware.
Middleware are functions that can be used for handling request and response objects.

In practice, you can use several middlewares at the same time. When you have more than one, they're executed one by one in the order that they were taken into use in express.

```javascript
// logger middleware
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);
```

At the end of the function body, the next function that was passed as a parameter is called. The next function yields control to the next middleware.

Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called.

There are also situations where we want to define middleware functions after routes. In practice, this means that we are defining middleware functions that are only called if no route handles the HTTP request. For example:

```javascript
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
```

- CORS

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

```
Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.
```

We can allow requests from other origins by using Node's cors middleware: `npm install cors`.
With other languages/frameworks the solution is similar (i.e. in Spring with WebMvcConfigurer using addCorsMappings).

```javascript
const cors = require("cors");

app.use(cors());
```

- Frontend production deploy

`npm run build` will instruct vite to bundle the app for production.

This creates a directory called dist which contains the only HTML file of our application (index.html) and the directory assets. Minified version of our application's JavaScript code will be generated in the dist directory. Even though the application code is in multiple files, all of the JavaScript will be minified into one file. All of the code from all of the application's dependencies will also be minified into this single file.

- Serving static files from the backend

Copy the dist folder generated by vite (i.e. from part2-countries) into the backend project folder, i.e.: `cp -r dist ../part3 # where index.js is as well`

Add the following middleware to the express app.

```javascript
app.use(express.static("dist"));
```

Whenever express gets an HTTP GET request it will first check if the dist directory contains a file corresponding to the request's address. If a correct file is found, express will return it.

Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/api/notes will be handled by the backend code.

- Proxy in Vite

```javascript
// vite.config.js file
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
```

The React development environment will work as a proxy. If the React code does an HTTP request to a server address at http://localhost:5173 not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at http://localhost:3001.

In production is not needed if the React app is server by the same Node.js backend.

- MongoDB

Pull image: `docker pull mongo`
Run container: `docker run -d -p 27017:27017 --name my-mongodb mongo`
Teardown: `docker stop my-mongodb && docker rm my-mongodb`
Log into container: `docker exec -it my-mongodb bash`
Run mongosh when inside the container `mongosh`

To persist data even if the container is deleted:

1. Create a new volume: `docker volume create mongodb_data`
2. Run the container specifying the volume: `docker run -d -p 27017:27017 --name my-mongodb -v mongodb_data:/data/db mongo`

This command mounts the volume mongodb_data to the /data/db directory inside the MongoDB container, which is where MongoDB stores its data.

Install mongoose to query MongoDB from Node.js: `npm install mongoose`

```javascript
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = "mongodb://localhost:27017/mydatabase";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
```

Install `npm install dotenv` for .env DB URI configurations.

Then create a .env file:

```
MONGODB_URI=
PORT=
```

- Validation and ESlint

https://fullstackopen.com/en/part3/validation_and_es_lint
