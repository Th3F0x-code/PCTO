const fs = require('fs');
const path = require('path');

function writeStats(req, res, next) {
  //write the stats passed in the json file
  fs.writeFile(__dirname + "/jsonmiddlewaredata/Stats.json", JSON.stringify(req.body), function (err) { if (err) throw err; });
  next();
};

function writeDataForTable(req, res, next) {
  let jsonFile;
  //if the json file is empty do the catch block, else do the try block
  //function that appends the json passed in the json file
  try {
    jsonFile = JSON.parse(fs.readFileSync(__dirname + "/jsonmiddlewaredata/DataForTable.json", function (err) { if (err) throw err; }));
    jsonFile.splice(0, 0, req.body);
    fs.writeFileSync(__dirname + "/jsonmiddlewaredata/DataForTable.json", JSON.stringify(jsonFile), function (err) { if (err) throw err; });
  }
  catch (err) {
    jsonFile = req.body;
    fs.writeFileSync(__dirname + "/jsonmiddlewaredata/DataForTable.json", "[" + JSON.stringify(jsonFile) + "]", function (err) { if (err) throw err; });
  }
  next();
}

module.exports = {
  writeStats: writeStats,
  writeDataForTable: writeDataForTable
}