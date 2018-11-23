'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Constants
const PORT = 8080;
const HOST = 'localhost';
const MONGODB = 'mongodb://localhost:27017/cpen442_db';

const user = require('./routes/user');
const photo = require('./routes/photo');
const init_db = require('./routes/initDB');

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', user);
app.use('/photo', photo);
app.use('/init_db', init_db);
app.get('/', (req, res) => {
  res.send("Hello world\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Mongoose
mongoose.connect(MONGODB, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
