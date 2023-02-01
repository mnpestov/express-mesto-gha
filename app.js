const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log('server');
});
