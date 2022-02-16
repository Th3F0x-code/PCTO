var express = require('express');
var app = express();
var apiroutes = require('./routes/apiroutes');
var path = require('path');
var cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', apiroutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/notLogged.html');
});


module.exports = app;