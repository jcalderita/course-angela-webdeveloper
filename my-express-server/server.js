const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contact', (req, res) => {
  res.send('contanto');
});

app.get('/about', (req, res) => {
  res.send('hola soy yo');
});

app.get('/hobbies', (req, res) => {
  res.send('<ul><li>Caca</li><li>Pedo</li><li>Pis</li><li>Moco</li></ul>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
