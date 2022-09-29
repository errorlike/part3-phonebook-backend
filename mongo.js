const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://errorlike:${password}@cluster0.n521eme.mongodb.net/phonebookapp?retryWrites=true&w=majority`;
mongoose.connect(url);
let addNewPerson = () => {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    person
        .save()
        .then(result => {
            console.log(`added ${result.name} ${result.number} to phonebook`);
            mongoose.connection.close();
        });
};
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    addNewPerson();
} else if (process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            console.log("phonebook");
            result.forEach(person => {
                console.log(person.name, person.number);
            });
            mongoose.connection.close();
        });
}




