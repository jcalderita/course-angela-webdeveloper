require('dotenv').config();
const express = require('express');
const { urlencoded } = express;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
// const encKey = process.env.SOME_32BYTE_BASE64_STRING;
// const sigKey = process.env.SOME_64BYTE_BASE64_STRING;
// userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/secrets',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
  res.redirect('/secrets');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const user = new User(req.body);
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect('/login');
    } else {
      const auth = passport.authenticate('local', { successRedirect: '/secrets', failureRedirect: '/login', failureFlash: false });
      auth(req, res);
    }
  });
});

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const filter = {
//     email: username,
//   };
//   User.findOne(filter, (err, doc) => {
//     if (err) console.log(err);
//     else if (doc) {
//       bcrypt.compare(password, doc.password, (err, same) => {
//         if (err) console.log(err);
//         else if (same) res.render('secrets');
//         else res.redirect('/');
//       });
//     } else res.redirect('/');
//   });
// });

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register({ username: username }, password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/login');
    } else {
      const auth = passport.authenticate('local', { successRedirect: '/secrets', failureRedirect: '/login', failureFlash: false });
      auth(req, res);
    }
  });
});
// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err) console.log(err);
//     else {
//       const newUser = new User({
//         email: username,
//         password: hash,
//       });

//       newUser.save((err) => {
//         if (err) console.log(err);
//         else {
//           res.render('secrets');
//         }
//       });
//     }
//   });
// });

app.get('/secrets', (req, res) => {
  User.find({ secret: { $ne: null } }, (err, result) => {
    if (err) console.log(err);
    else if (result) res.render('secrets', { usersWithSecrets: result });
  });

  // if (req.isAuthenticated()) res.render('secrets');
  // else res.redirect('/login');
});

app.get('/submit', (req, res) => {
  if (req.isAuthenticated()) res.render('submit');
  else res.redirect('/login');
});

app.post('/submit', (req, res) => {
  const { secret } = req.body;
  User.findById(req.user.id, (err, user) => {
    if (err) console.log(err);
    else if (user) {
      user.secret = secret;
      user.save(() => res.redirect('/secrets'));
    }
  });
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.listen(port, () => console.log('http://localhost:3000'));
