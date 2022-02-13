var express = require('express');
var app = express();
var apiRouter = require('./routes/apiRoutes');
//libreria per scrivere su file
const fs = require('fs');
const path = require('path');
const { expr } = require('jquery');
var isLoggedIn, account;

// fs.unlinkSync(__dirname + '/datiUtente.json', (err) => {
//     if (err) throw err;
//     console.log('File deleted!');
// });


//da sistemare codice in generale perche fa abbastanza schifo + problema che non funziona redirect una volta loggato( non)
//è un problema di refresh della pagina, credo sia sbagliata la app.get che fa il redirect su logged.html

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);


//rotta per le api che utilizzeremo
app.use('/api', apiRouter);

app.use(express.static(__dirname + '/public'));

var Json = fs.readFile(__dirname + '/datiUtente.json', (err, contents) => {
    if (err){
      fs.writeFileSync(__dirname + '/datiUtente.json', '{"isLoggedIn": false, "account": ""}');
    }
    else{
      var data = JSON.parse(contents);
      Object.keys(data).forEach(function(key) {
        if(key == 'isLoggedIn')
          isLoggedIn = data[key];
        else
          account = data[key];
      });
        
      if(account == "" && isLoggedIn == false) {
        console.log("sono qui, non loggato");
        app.get('/', function (req, res) {
          res.redirect('notLogged.html');
      });
      }
      else if(account != "" && isLoggedIn == true) {
        console.log("sono qui, loggato");
        app.get('/', function (req, res) {

          res.redirect('logged.html');
      });
      }
    }
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

