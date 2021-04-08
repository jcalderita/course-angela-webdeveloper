const express = require('express');
const { urlencoded } = express;
const mongoose = require('mongoose');
const _ = require('lodash');
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 3000;
const date = require(__dirname.concat('/date.js'));

app.set('view engine', 'ejs');
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model('Item', itemSchema);

const buyFood = new Item({ name: 'Buy Food' });
const cookFood = new Item({ name: 'Cood Food' });
const eatFood = new Item({ name: 'Eat Food' });
const items = [buyFood, cookFood, eatFood];

app.get('/', (req, res) => {
  Item.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      res.render('list', { listTitle: date.getDate(), newListItems: [] });
    } else {
      if (docs.length === 0) {
        Item.insertMany(items, (err) => {
          err ? console.log(err) : console.log('Insertados');
        });

        res.redirect('/');
      }

      // const items = docs.map((e) => e.name);
      res.render('list', { listTitle: date.getDate(), newListItems: docs });
    }
  });
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

const List = mongoose.model('List', listSchema);

app.get('/:route', (req, res) => {
  const listName = _.lowerCase(req.params.route);

  List.findOne({ name: listName }, (err, result) => {
    if (err) console.log(err);
    else {
      if (!result) {
        const list = new List({ name: listName, items: items });
        list.save();
        res.redirect('/'.concat(listName));
      } else {
        res.render('list', { listTitle: result.name, newListItems: result.items });
      }
    }
  });
});

app.post('/', (req, res) => {
  const listName = _.lowerCase(req.body.list);
  const newItem = new Item({ name: req.body.newItem });

  if (listName === date.getDate()) {
    newItem.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listName }, (err, result) => {
      if (err) console.log(err);
      else {
        result.items.push(newItem);
        result.save();
        res.redirect('/'.concat(listName));
      }
    });
  }
});

app.post('/delete', (req, res) => {
  const listName = _.lowerCase(req.body.list);
  if (listName === date.getDate()) {
    Item.findByIdAndRemove(req.body.id, (err) => {
      err ? console.log(err) : res.redirect('/');
    });
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: req.body.id } } }, (err, result) => {
      if (err) console.log(err);
      else {
        res.redirect('/'.concat(listName));
      }
    });
  }
});

app.listen(port, () => console.log('http://localhost:3000'));
