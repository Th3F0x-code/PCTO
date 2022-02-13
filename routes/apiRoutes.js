var express = require('express');
var router = express.Router();
var data = "";
const midw = require('../middleware/logOnPost');

//api LoggedPage, tutte api che controllano e scambiano informazioni riguardo il login
router.post('/LoggedPage', midw.writeUserData, midw.writeRequestData, (req, res, next) => {
    //stampa i dati dell'utente , da implementare funzione che manda i dati a logOnPost.js che a sua volta li scrive su file
    data = {
        isLoggedIn: req.body.isLoggedIn,
        account: req.body.account,
    }
    console.log(data);
    res.send(data);
});


module.exports = router;