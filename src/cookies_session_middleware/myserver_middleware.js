"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");
let router = express.Router();  //rutas


module.exports = router;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let bcrypt = require("bcrypt-nodejs");
//let hash = bcrypt.hashSync("amyspassword");
//console.log(`amypassword hashed = ${hash}`);
let users = {
  //amy : hash,
  juan : bcrypt.hashSync("juanpassword"),
  antonio : bcrypt.hashSync("antoniopassword")
};

//Archivos estaticos css, js, img, html
//app.use(express.static('./gh-pages'));

//ruteo
app.get('/', function(req, res){
//res.sendfile(__dirname + '/gh-pages/index.html');
console.log('peticion a la /')
});
app.use(cookieParser());
app.use(session({
    secret: 'Pruebas_Carlos_David',
    resave: true,
    saveUninitialized: true
}))

app.use(function(req, res, next) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  console.log("session :  "+util.inspect(req.session));
  next();
});

//MIDDLEWARE

let auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};

// Get content endpoint
app.get('/content/*?',
    auth  // next only if authenticated
);
/*
app.get('/login/:id?', function (req, res) {
  console.log('req.params.id: '+(req.params.id));
  console.log('Request Type:', req.method);
  console.log('Request Path:', req.path);
  //res.send('USUARIO: '+(req.params.id || 'unknown' ));
  //res.render('index', { title: '/user/' ,username: req.params.id });
});*/

app.use('/content', express.static(path.join(__dirname, 'public')));

//escuchar
var server = app.listen(8090, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
