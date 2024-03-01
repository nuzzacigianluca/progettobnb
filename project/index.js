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
             if (get){
               const data = JSON.stringify(result);
             }               
             resolve(result);         
       });
    });
 };
const getCredentials= ()=>{
   const sql = `
   SELECT User.username, User.password
   FROM User
      `;
   return executeQuery(sql, true); 
 };


 app.post("/login", (req, res) => {
   const credentials = req.body;
   getCredentials().then((data)=>{
      const correct = data;
      if (correct[0].username == credentials.username && correct[0].password == credentials.password){
         res.json({result: true});
      }else{
         res.status(401);
         res.json({result: false});
      }
   });
});