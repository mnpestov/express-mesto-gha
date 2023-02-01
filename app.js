const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

app.use(routes);

app.listen(PORT, () => {
  console.log('server');
});
