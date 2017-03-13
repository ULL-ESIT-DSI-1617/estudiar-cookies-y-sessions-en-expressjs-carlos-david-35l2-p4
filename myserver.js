"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
//let path = require('path');
//let util = require("util");

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
//escuchar
var server = app.listen(8090, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
