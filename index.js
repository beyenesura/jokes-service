const express = require('express');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    const { tags, content } = req.query;
    const filter = {};
    if (tags) {
      filter.tags = tags;
    }
    if (content) {
      filter.content = content;
    }
    const jokes = await Joke.find(filter);
    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

module.exports = app;
