const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '63da7cc031a5c5da7b306101',
  };

  next();
});

app.use(routes);

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb ', {
    useNewUrlParser: true,
  });
  await app.listen(PORT);
  console.log('server');
}

connect();
