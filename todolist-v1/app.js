const express = require('express');
const { urlencoded } = express;
const app = express();
const port = 3000;
const date = require(__dirname.concat('/date.js'));

app.set('view engine', 'ejs');
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const itemsWork = [];

app.get('/', (req, res) => {
  // res.sendFile(__dirname.concat('/index.html'));

  res.render('list', { listTitle: date.getDate(), newListItems: items });
});

app.post('/', (req, res) => {
  if (req.body.list === 'Work list') {
    itemsWork.push(req.body.newItem);
    res.redirect('/work');
  } else {
    items.push(req.body.newItem);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work list', newListItems: itemsWork });
});

// app.post('/work', (req, res) => {
//   itemsWork.push(req.body.newItem);
//   res.redirect('/work');
// });

app.listen(port, () => console.log('http://localhost:3000'));
