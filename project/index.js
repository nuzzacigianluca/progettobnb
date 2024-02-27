const express = require("express");
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
//DB connection
const fs = require('fs');
const mysql = require('mysql2');
const conf = require('./conf.js');
const connection = mysql.createConnection(conf);

const app = express();
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});

 const executeQuery = (sql, get) => {
    return new Promise((resolve, reject) => {      
          connection.query(sql, function (err, result) {
             if (err) {
                console.error(err);
                reject();     
             }    
             //console.log('done');
             if (get){
               const data = JSON.stringify(result);
             }               
             resolve(result);         
       });
    });
 };
