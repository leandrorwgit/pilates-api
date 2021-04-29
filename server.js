var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
 
const db = require('./src/config/db.config.js');
 
require('./src/routes/usuario.route.js')(app);
 
// Create a Server
var server = app.listen(process.env.PORT || 3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})