var express = require('express');
var app = express();

app.use(express.static('WebContent'));

app.get('/', function (req, res) {
  console.log("received request");
  res.redirect('/WebContent/index.html');

});

var server = app.listen(3000, function () {

  var port = server.address().port;
  console.log('server listening on port %s', port);

});