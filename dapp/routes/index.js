/* BISOGNAVA SCRIVERE IL REINDIRIZZAMENTO QUI E DE CONSEGUENZA ANCHE LE ALTRE COSE */


var express = require('express');
var router = express.Router();
var app = express();
const path = require('path');


//redirect to index.html with express
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;
