const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose
    .connect(url)
    .then(result => {
        console.log('connect to MongoDB');
        console.log(`${result}`);
    }).catch(error => {
        console.log('error connecting to MongoDB', error.message);
    });
const personSchema = mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 3,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    }
);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject._v;
    }
});

module.exports = mongoose.model('Person', personSchema);
