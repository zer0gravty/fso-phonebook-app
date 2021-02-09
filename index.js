const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// custom
const People = require('./models/phonebook');
// setup
const PORT = process.env.PORT || 3001;
const app = express();
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
// logging
morgan.token('post-body', (req) => {
    return Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

// routes
app.get('/api/persons', (request, response) => {
    People.find({}).then(people => response.json(people));
});

app.get('/info', (request, response) => {
    People.countDocuments({}).then(count => {
        return response.send(
            `<p>Phonebook has info for ${count || 0} ${count === 1 ? 'person' : 'people'}</p>
             <p>${new Date().toISOString()}</p>`
        )
    });
});
        
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    People.findById(id).then(person => {
        return person ? response.json(person) : response.status(404).end();
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    People.findByIdAndDelete(id)
        .then(result => {
            return response.status(204).end();
        })
        .catch(error => {
            return response.status(400).end();
        });
});

app.post('/api/persons', (request, response) => {
    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'missing required value'});
    }
    
    // if (phonebook.some(entry => entry.name === person.name)) {
    //     return response.status(400).json({ error: 'name already exists' });
    // }
    
    const newPerson = new People({
        name: person.name,
        number: person.number
    });

    newPerson.save().then(savedPerson => response.json(savedPerson));
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
