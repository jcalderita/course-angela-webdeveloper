const express = require('express');
const { urlencoded } = require('express');

const app = express();
app.use(urlencoded({ extended: true }));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname.concat('/index.html'));
});

app.get('/bmicalculator', (req, res) => {
  res.sendFile(__dirname.concat('/bmiCalculator.html'));
});

app.post('/', (req, res) => {
  const { num1, num2 } = req.body;
  const result = +num1 + +num2;
  res.send('El resultado es ...' + result);
});

app.post('/bmicalculator', (req, res) => {
  const { num1, num2 } = req.body;
  const result = +num1 * +num2;
  res.send('El resultado es ...' + result);
});

app.listen(port, () => console.log('http://localhost:3000'));
