var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/../react-client/dist'));

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.post('/todo', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('POST add received: ', req.body.description);

  db.write(req.body, function(err, row){
    if (err) console.log(err);
    //console.log('Row inserted: ', row.description);
    res.status(200).send(req.body.description);
  })
});

app.post('/todo/crossed', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('POST crossed received: ', req.body.description);

  db.crossed(req.body, function(err, row){
    if (err) console.log(err);
    //console.log('Row crossed: ', row.description);
    res.status(200).send(req.body.description);
  })
});

app.get('/todo', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('GET received');
  db.read(function(err, rows){
    if (err) console.log(err);
    //console.log('Rows received: ', rows[0].description);
    res.status(200).send(rows);
  })
});

app.get('/todo', function (req, res) {
  console.log('GET received: ', req.body);
  res.sendStatus(200);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

