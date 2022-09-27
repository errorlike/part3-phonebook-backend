const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(cors())
let persons = [
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
];
const generateId = () => {
    const maxId = Math.floor(Math.random() * 10000);
    return maxId;
};
app.use(morgan("tiny"));
app.get("/api/persons", (request, response) => {
    response.json(persons);
});
app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id;
    const person = persons.find(note => note.id === id);
    console.log(person);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});
app.delete("/api/persons/:id", (request, response) => {
    const id = +request.params.id;
    persons = persons.filter((note) => {
        note.id !== id;
    });
    response.status(204).end();
});
app.get("/info", (request, response) => {
    const date = new Date();
    response.send(`Phonebook has info for ${persons.length} persons<br> ${date}`);
});
app.post("/api/persons", (request, response) => {
    const body = request.body;
    const name = body.name;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number missing"
        });
    } else if (persons.find(person => person.name == name)) {
        return response.status(400).json({
            error: "name must be unique"
        });
    }
    const person = {
        id: generateId(),
        name,
        number: body.number,
    };
    persons = persons.concat(person);
    console.log(persons);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port${PORT}`);
});