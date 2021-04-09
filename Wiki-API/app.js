const express = require('express');
const { urlencoded } = express;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model('Article', articleSchema);

const getFunction = (req, res) => {
  const filter = req.params.article ? { title: req.params.article } : {};
  console.log(filter);
  Article.find(filter, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const postFunction = (req, res) => {
  const newArticle = new Article(req.body);
  newArticle.save((err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const deleteFunction = (req, res) => {
  const filter = req.params.article ? { title: req.params.article } : {};
  Article.deleteMany(filter, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const putFunction = (req, res) => {
  const filter = { title: req.params.article };
  const update = req.body;
  Article.replaceOne(filter, update, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

const patFunction = (req, res) => {
  const filter = { title: req.params.article };
  const update = req.body;
  Article.updateOne(filter, update, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
};

app.route('/articles').get(getFunction).post(postFunction).delete(deleteFunction);

app.route('/articles/:article').get(getFunction).put(putFunction).patch(patFunction).delete(deleteFunction);

app.listen(port, () => console.log('http://localhost:3000'));
