const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// custom
const People = require('./models/phonebook');
const { response } = require('express');

// setup
const PORT = process.env.PORT || 3001;
const app = express();
// error handling to be used in middleware; see before app.listen
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'});
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

// logging
morgan.token('post-body', (req) => {
    return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

// routes
app.get('/api/persons', (request, response, next) => {
    People.find({}).then(people => response.json(people))
        .catch(error => next(error));
});

app.get('/info', (request, response) => {
    People.countDocuments({}).then(count => {
        return response.send(
            `<p>Phonebook has info for ${count || 0} ${count === 1 ? 'person' : 'people'}</p>
             <p>${new Date().toISOString()}</p>`
        )
    });
});
        
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    People.findById(id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error) );
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    People.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const person = request.body;
    const newPerson = new People({
        name: person.name,
        number: person.number
    });

    newPerson.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const updatedPerson = {
        name: request.body.name,
        number: request.body.number,
    };

    People.findByIdAndUpdate(request.params.id, updatedPerson, { 
            new: true,
            runValidators: true,
            context: 'query' }
        )
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
