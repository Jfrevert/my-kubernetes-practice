const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');

app.use(cors());
app.options('*', cors());

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Origin", "*");
  next();
}

app.use(allowCrossDomain);


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


console.log("Now serving React app")
app.listen(9000);