var express = require('express');
var app = express();
var apiroutes = require('./routes/apiroutes');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', apiroutes);

app.get('https://krypto-medical.herokuapp.com/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


module.exports = app;