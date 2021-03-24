/*const http = require('http');
const url = require('url');
const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "manroopk_INDDB",
    password: "12345",
    database: "manroopk_INDDB"
});


var server = http.createServer(function (req, res) {
    let q = url.parse(req.url, true);

    res.writeHead(200, { 
        "Content-type": "text/html",
        "Access-Control-Allow-Origin": "*"
    });

    db.connect(function(err) {
        if(err) {
            throw err;
        }
    
    db.query("SELECT * FROM quotes", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var myResult = JSON.stringify(result);
    res.end(myResult);
  });
    
    });
});
server.listen ();*/

// load our app server using express somehow....
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public'));

app.use(morgan('short'));


app.get('/COMP351/labs/Bronze/readDB/public/insert', (req, res) => {
  console.log("Trying to insert a new quote...");
  console.log("How do we get the form data???");

  console.log("Quote: " + req.body.quote);
  const quoteInput = req.body.quote;
  const authorInput = req.body.author;

  const queryString = "INSERT INTO quotes(quote, author) VALUES (?, ?)";
  getConnection().query(queryString, [quoteInput, authorInput], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err);
      res.sendStatus(500);
      return;
    }

    console.log("Inserted a new user with id: ", results.insertId);
    res.end();
  });
});
function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: "manroopk_INDDB",
    password: "12345",
    database: "manroopk_INDDB"
  });
}

app.get("/COMP351/labs/Bronze/readDB/public/reader", (req, res) => {
  const connection = getConnection();
  const queryString = "SELECT * FROM quotes";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});


app.listen ();
/*
app.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id);

  const connection = getConnection();

  const userId = req.params.id;
  const queryString = "SELECT * FROM users WHERE id = ?";
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
      // throw err
    }

    console.log("I think we fetched users successfully");

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name};
    });

    res.json(users);
  });
});

app.get("/users", (req, res) => {
  const connection = getConnection();
  const queryString = "SELECT * FROM users";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from ROOOOOT");
});*/

// localhost:3003
//app.listen(3003, () => {
  //console.log("Server is up and listening on 3003...");
//});

