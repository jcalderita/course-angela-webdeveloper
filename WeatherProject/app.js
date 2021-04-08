const express = require('express');
const { urlencoded } = require('express');
const https = require('https');
const url = 'https://api.openweathermap.org/data/2.5/weather?appid=e47a3308250709ff3622088b0eae8f06&units=metric';

const app = express();
app.use(urlencoded({ extended: true }));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname.concat('/index.html'));
});

app.post('/tiempo', (req, response) => {
  const { ciudad } = req.body;

  https
    .get(url.concat(`&q=${ciudad}`), (res) => {
      res.on('data', (d) => {
        const weatherData = JSON.parse(d);
        const {
          weather: [{ description, icon }],
          main: { temp },
        } = weatherData;
        const imgUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        response.write('<p>El tiempo esta ...'.concat(description, '</p>'));
        response.write('<h1>La temperatura es ... '.concat(temp, '</h1>'));
        response.write('<img src="' + imgUrl + '"/>');

        response.end();
      });
    })
    .on('error', (e) => {
      console.error(e);
    });
});

app.listen(port, () => console.log('http://localhost:3000'));
