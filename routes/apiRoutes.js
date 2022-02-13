var express = require('express');
var router = express.Router();

var data = "";

//api LoggedPage, tutte api che controllano e scambiano informazioni riguardo il login
router.post('/LoggedPage', (req, res) => {

    //stampa i dati dell'utente , da implementare funzione che manda i dati a logOnPost.js che a sua volta li scrive su file
    console.log(req.body);
    data = {
        isLoggedIn: req.body.isLoggedIn,
        account: req.body.account,
    }
});


module.exports = router;