"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");
let router = express.Router();  //rutas

//myserver_middleware.js

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
    saveUninitialized: false
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

// Login endpoint
app.get('/login', function (req, res) {
  console.log(req.query);
  if (!req.query.username || !req.query.password) {
    console.log('login failed');
    res.send('login failed');
  } else if(req.query.username in users  &&
            bcrypt.compareSync(req.query.password, users[req.query.username])) {
    req.session.user = req.query.username;
    req.session.admin = true;
    res.send(layout("login success! user "+req.session.user));
  } else {
    console.log(`login ${util.inspect(req.query)} failed`);
    res.send(layout(`login ${util.inspect(req.query)} failed. You are ${req.session.user || 'not logged'}`));
  }
});

/*
app.get('/login/:id?', function (req, res) {
  console.log('req.params.id: '+(req.params.id));
  console.log('Request Type:', req.method);
  console.log('Request Path:', req.path);
  //res.send('USUARIO: '+(req.params.id || 'unknown' ));
  //res.render('index', { title: '/user/' ,username: req.params.id });
});*/

app.get('/logout', function (req, res) {
  res.send(layout(req.session.user+" logout success!"));
  req.session.destroy();
});

// Get content endpoint
app.get('/content/*?',
    auth  // next only if authenticated
);

app.use('/content', express.static(path.join(__dirname, 'public')));

//escuchar
var server = app.listen(8090, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
