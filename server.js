'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Constants
const PORT = 8080;
const HOST = '172.20.10.2';
const MONGODB = 'mongodb://localhost:27017/cpen442_db';

const student = require('./routes/student');
const exam = require('./routes/exam');

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/student', student);
app.use('/exam', exam);
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
