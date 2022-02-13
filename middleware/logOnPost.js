//libreria per scrivere su file
const fs = require('fs');

//funziione per scrivere su file i dati dell'utente che si è connesso (in seguito anche informazioni aggiuntive)
const writeUserData =  (req, res, next) => {
    let file  =__dirname + '../datiUtente.json';

    let data = {
        isLoggedIn: req.body.isLoggedIn,
        account: req.body.account,
    }
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) console.log("Errore durante la scrittura del file: " + err);
    });
    next();
};

//funzione che fa un log delle richieste avvenute indicandone il tipo, il metodo e il contenuto
const writeRequestData =  (req, res, next) => {
    let file2  =__dirname + './logRequests.log';
    let data2 = {
        data: req.body.data,
        method: req.body.method,
        body: req.body,
    }
    fs.writeFile(file2, JSON.stringify(data2), (err) => {
        if (err) console.log("Errore durante la scrittura del file: " + err);
    });
    next();
};


module.exports = {
    writeUserData,
    writeRequestData,
}