const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// const apple = new Fruit({
//   name: 'Apple',
//   rating: 10,
//   review: 'Pretty solid as a fruit.',
// });
// apple.save();

// const pineapple = new Fruit({
//   name: 'Pineapple',
//   rating: 9,
//   review: 'Great Fruit.',
// });
// pineapple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//   name: 'John',
//   age: 37,
// });
// person.save();

// const jorge = new Person({
//   name: 'Jorge',
//   age: 42,
//   favouriteFruit: pineapple,
// });
// jorge.save();

// const kiwi = new Fruit({
//   name: 'Kiwi',
//   rating: 10,
//   review: 'The best fruit!',
// });

// const orange = new Fruit({
//   name: 'Orange',
//   rating: 4,
//   review: 'Too sour for me',
// });

// Fruit.insertMany([kiwi, orange], (err) => {
//   if (err) console.log(err);
//   else console.log('Todo bien.');
// });

// Fruit.updateOne({ name: 'Apple' }, { review: 'Muy rico.' }, (err) => {
//   if (err) console.log(err);
//   else console.log('Update correcto');
// });

// Fruit.deleteOne({ name: 'Apple' }, (err) => {
//   err ? console.log(err) : console.log('Correcto');
// });

// Person.deleteMany({ name: 'John' }, (err) => {
//   err ? console.log(err) : console.log('Correcto');
// });

Fruit.findOne({ name: 'Apple' }, (err, fruit) => {
  if (err) {
    console.log(err);
    return;
  }
  Person.updateOne({ name: 'John' }, { favouriteFruit: fruit }, (err) => {
    err ? console.log(err) : console.log('Update realizado');
  });
});

Fruit.find((err, fruits) => {
  if (err) console.log('Error');
  else {
    const frutas = fruits.map((e) => e.name);
    console.log(frutas.join(', '));
  }
  mongoose.connection.close();
});
