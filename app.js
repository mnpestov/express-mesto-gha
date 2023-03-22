const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

app.post('/signin', express.json(), login);
app.post('/signup', createUser);
app.use(auth);
app.use(routes);

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb ', {
    useNewUrlParser: true,
  });
  await app.listen(PORT);
}

connect();
