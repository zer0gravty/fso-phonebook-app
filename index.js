const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

morgan.token('post-body', (req) => {
    return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));
// const requestLogger = (request, response, next) => {
    //     console.log('Method: ', request.method);
    //     console.log('Path: ', request.path);
    //     console.log('Body: ', request.body);
    //     console.log('---');
    //     next();
    // }
    // app.use(requestLogger);
  
let phonebook = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]
    
app.get('/api/persons', (request, response) => {
    response.json(phonebook);
});

app.get('/info', (request, response) => {
    const count = phonebook.length;
    response.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${new Date().toISOString()}</p>`
        )
    });
        
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find( entry => entry.id === id);
    return person ? response.json(person) : response.status(404).end();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find( entry => entry.id === id);
    if (!person) {
        return response.status(400).end();
    }
    
    phonebook = phonebook.filter( entry => entry.id !== id);
    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const newId = Math.ceil(Math.random() * 1000000000);
    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'missing required value'});
    }
    
    if (phonebook.some(entry => entry.name === person.name)) {
        return response.status(400).json({ error: 'name already exists' });
    }
    
    const newPerson = {
        id: newId,
        name: person.name,
        number: person.number
    }
    
    phonebook = phonebook.concat(newPerson);
    response.json(newPerson);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
