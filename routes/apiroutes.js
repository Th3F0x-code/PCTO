var express = require('express');
var router = express.Router();
var path = require('path');
var middleware = require('../middleware/writedata');

//funciton that send the json file with the abi of the contract
router.get('/getabi', (req, res) => {
    res.sendFile(path.join(__dirname, '../contracts/Donations.json'));
});

//function that send the json file with some data of the contract
router.get('/getstats', (req, res) => {
    res.sendFile(path.join(__dirname, '../middleware/jsonmiddlewaredata/Stats.json'));
});

//function that send the json file with the data of the transaction
router.get('/getdatafortable', (req, res) => {
    res.sendFile(path.join(__dirname, '../middleware/jsonmiddlewaredata/DataForTable.json'));
});

//function that send some json to the server and then write it in the file with the middleware function writeStats
router.post('/setstats', middleware.writeStats);

//function that send some json to the server and then write it in the file with the middleware function writeDataForTable
router.post('/setdatafortable', middleware.writeDataForTable);

module.exports = router;
