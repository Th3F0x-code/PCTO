//libreria per scrivere su file
const fs = require('fs');
const path = require('path');

//funziione per scrivere su file i dati dell'utente che si è connesso (in seguito anche informazioni aggiuntive)
const writeUserData =  (req, res, next) => {
    let fileUsers  =__dirname + '/../datiUtente.json';

    let dataUsers = {
        isLoggedIn: req.body.isLoggedIn,
        account: req.body.account,
    }
    fs.writeFile(fileUsers, JSON.stringify(dataUsers), (err) => {
        if (err) console.log("Errore durante la scrittura del file: " + err);
    });
    next();
};

//funzione che fa un log delle richieste avvenute indicandone il tipo, il metodo e il contenuto
const writeRequestData =  (req, res, next) => {

    var oggi = new Date();
    var dataOggi = oggi.getFullYear()+'-'+(oggi.getMonth()+1)+'-'+oggi.getDate();
    var ora = oggi.getHours() + ":" + oggi.getMinutes() + ":" + oggi.getSeconds();
    var dataEOra = dataOggi+' '+ora;

    let fileRequests  =__dirname + '/../logRequests.log';
    let dataRequests = {
        data: dataEOra,
        method: req.method,
        body: req.body,
    }
    fs.appendFile(fileRequests, JSON.stringify(dataRequests), (err) => {
        if (err) console.log("Errore durante la scrittura del file: " + err);
    });
    next();
};


module.exports = {
    writeUserData,
    writeRequestData,
}