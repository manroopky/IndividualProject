const http = require('http');
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
        "Content-type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });

    db.connect(function(err) {
        if(err) {
            throw err;
        }
    //let sql = "INSERT INTO quotes(author, quote) values ('Jodie Foster', 'Normal is not something to aspire to, it is something to get away from.')";

     sql = "DELETE FROM quotes WHERE quoteID = " + q.query.quoteID ;
        db.query(sql, function(err, result) {
            if(err) {
                throw err;
            }
            console.log("1 record deleted");
            console.log(q.query);
        });
    
    
        res.writeHead(301, {"Location": "https://manroopkaur.ca/COMP351/labs/Bronze/admin.html"});
        res.end();
               
    });
});
server.listen ();