var express = require('express');
var app = express();
var apiRouter = require('./routes/apiRoutes');
var midw = require('./middleware/logOnPost');


//per poter farle funzionare serve sistemare il problema di logOnPost che da problemiù

//app.use('/api/LoggedPage', midw.writeUserData);
//app.use('/api/LoggedPage', midw.writeRequestData);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

//rotta per le api che utilizzeremo
app.use('/api', apiRouter);


//da implementare funzione che controlla se l'utente è gia loggato, altrimenti reindirizza alla pagina di login
//app.use(function(req, res, next) {
    //if (req.session.loggedIn) {
      //  next();
    //} else {
    //    res.redirect('/login');
    //}


    //redirect su notLogged.html
app.get('/', (req, res) => {
    res.redirect('notLogged.html');
});

app.listen(3000);

