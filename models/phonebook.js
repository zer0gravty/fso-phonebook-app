const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const dotenv = require('dotenv');
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URI = process.env.DB_URI;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URI}/${DB_NAME}?retryWrites=true&w=majority`;

console.log('Connecting to MongoDB...');
mongoose.connect(url, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
})
.then(result => console.log('Connection successful.'))
.catch(error => {
    console.log(`Error connecting to MongoDB:\n\t${error}`);
    process.exit(1);
});

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
    }
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
