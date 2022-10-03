require("dotenv").config();
const Person = require('./models/person');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.use(morgan("tiny"));

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then((persons => {
            response.json(persons);
        }))
        .catch(error => next(error));
});
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});
app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    console.log(id);
    Person
        .findByIdAndRemove(id)
        .then(
            response.status(204).end()
        )
        .catch(error => next(error));
});
// app.get("/info", (request, response) => {
//     const date = new Date();
//     response.send(`Phonebook has info for ${persons.length} persons<br> ${date}`);
// });
app.post("/api/persons", (request, response, next) => {
    const body = request.body;
    const name = body.name;
    const number = body.number;
    // if (!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: "name or number missing"
    //     });
    // }
    // else if (persons.find(person => person.name == name)) {
    //     return response.status(400).json({
    //         error: "name must be unique"
    //     });
    // }
    const person = new Person({
        name,
        number
    });
    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => next(error));
});
const errorhandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorhandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`);
});