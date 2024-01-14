/**
 * .env
 * PORT=
 * MONGODB_URI=
 */
require('dotenv').config(); // make environment variables saved in .env available globally
const express = require("express");
const morgan = require("morgan"); // logging middleware for Express
const Person = require('./models/person')

// old data struct for phonebook
// now using MongoDB as storage
/*let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]*/

const PORT = process.env.PORT
const app = express();

// json-parser middleware
app.use(express.json());

// Use the 'tiny' format for logging using the morgan middleware
//app.use(morgan('tiny'));

// custom morgan token to log requests post data
morgan.token('req-body', (req) => JSON.stringify(req.body));

// Use this custom format instead of the default `tiny` format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req-body'));

//const generateId = () => {
//  const maxId = phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
//  return maxId + 1;
//};

app.get("/info", (request, response) => {
  let html = `<p>Phonebook has info for ${phonebook.length} people</p>`
  html += `<p>${new Date()}</p>`

  response.send(html)
});

app.get("/api/persons", (request, response) => {
  //response.json(phonebook);
  Person.find({}).then(result => {
    response.json(result);
  })
});

app.get("/api/persons/:id", (request, response, next) => {
  //const id = Number(request.params.id)
  //let person = phonebook.find(p => p.id === id)
  //if (!person) {
  //  return response.status(404).end()
  //}

  //response.json(person)
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      //console.log(error)
      //response.status(400).send({ error: 'malformatted id' })
      next(error) // continue to error handler middleware
    })
})

app.delete("/api/persons/:id", (request, response, next) => {
  //const id = Number(request.params.id)
  //const lengthBefore = phonebook.length
  //phonebook = phonebook.filter(p => p.id !== id)
  
  //const lengthAfter = phonebook.length
  //let status = 204
  //if (lengthBefore === lengthAfter) {
  //  status = 404
  //}

  //response.status(status).end()

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
app.put('/api/persons/:id', (request, response, next) => {
  //const body = request.body
  const { name, number } = request.body

  //const person = {
  //  name: body.name,
  //  number: body.number,
  //}

  // runValidators otherwise mongodb does not do it by default (i.e. restrictions defined in models/person.js)
  Person.findByIdAndUpdate(
    request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' }
  ).then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

/*app.post("/api/persons", (request, response) => {
  const body = request.body;
  //console.log(typeof(body))

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (phonebook.filter(p => p.name === body.name).length > 0) {
    return response.status(404).json({
      error: `${body.name} already present in the phonebook!`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phonebook = phonebook.concat(person);

  response.json(person);
})*/

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
