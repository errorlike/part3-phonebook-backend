const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose
    .connect(url)
    .then(result => {
        console.log("connect to MongoDB");
    }).catch(error => {
        console.log("error connecting to MongoDB", error.message);
    });
const personSchema = mongoose.Schema(
    {
        name: String,
        number: String
    }
);

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject._v;
    }
});

module.exports = mongoose.model('Person', personSchema);
