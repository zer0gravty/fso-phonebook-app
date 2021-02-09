const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Usage: node mongo.js <password>');
    console.log('Example: node mongo.js Password*1 ');
    process.exit(1);
};

if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('Usage: node mongo.js <password> <name> <number>');
    console.log('Example: node mongo.js Password*1 "Alice Bob" 222-1234');
    process.exit(2);
};

if(process.argv.length > 5) {
    console.log('Too many command line arguments. Check the usage.');
    process.exit(3);
}

const DB_NAME = process.env.DB_NAME;
const DB_URI = process.env.DB_URI;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.argv[2];

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URI}/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({
        name: name,
        number: number,
    });
    person.save().then( result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else if (process.argv.length === 3) {
    Person.find({}).then( result => {
        result.forEach( person => {
            console.log(person);
        })
        mongoose.connection.close();
    });
};
