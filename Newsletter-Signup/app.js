const express = require('express');
const { urlencoded, static } = express;
const https = require('https');

const appId = '6731092405971683fedcec9aa0e32ecc-us1';
const mailChimpAudience = 'ccf9378d55';

const app = express();
app.use(urlencoded({ extended: true }));
app.use(static('public'));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname.concat('/signup.html'));
});

app.post('/', (req, response) => {
  const { fName, lName, eMail } = req.body;

  const data = {
    members: [
      {
        email_address: eMail,
        status: 'subscribed',
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = `https://us1.api.mailchimp.com/3.0/lists/${mailChimpAudience}`;
  const options = {
    method: 'POST',
    auth: 'Jorge:'.concat(appId),
  };

  const request = https.request(url, options, (res) => {
    res.statusCode === 200 ? response.send('Correcto') : response.send('Incorrecto');

    res.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || port, () => console.log('http://localhost:3000'));
