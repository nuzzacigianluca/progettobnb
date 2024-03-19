const express = require("express");
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
//DB connection
const fs = require('fs');
const mysql = require('mysql2');
const conf = require('./conf.js');
const { exec } = require("child_process");
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
             };               
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
const getBnBs= ()=>{
   const sql = `SELECT BnB.id, BnB.name, BnB.address, BnB.description, BnB.coordinates, Coordinates.latitude, Coordinates.longitude
   FROM BnB,Coordinates
   WHERE BnB.coordinates = Coordinates.id
      `;
   return executeQuery(sql, true); 
 };
app.get("/bnbs", (req, res) => {
   getBnBs().then((data)=>{
      res.json({bnbs:data});
   });
   
});


app.post("/savebnb", async(req, res) => {
   const data = req.body;
   const address = data.address.toLowerCase();
   try{
      await saveCoord(data.coordinates.lat, data.coordinates.long);
      await saveBnB(data.name, address, data.description,data.coordinates.lat, data.coordinates.long);
      res.json({Response: true});
   }catch{
      res.json({Response: false});
   };
});


const saveCoord = (lat, lon) => {
   let template = `
   INSERT INTO Coordinates (latitude, longitude)
   VALUES ($LAT, $LONG) 
      `;
   const sql = template.replace("$LAT", lat)
   .replace("$LONG", lon);
   return executeQuery(sql);
};

const checkIfDuplicate = (address) => {
   let template = `
   SELECT COUNT(*)  
   FROM BnB
   WHERE BnB.address='$ADDRESS'
   `
   const sql = template.replace("$ADDRESS", address);
   return executeQuery(sql, true);
};
const saveBnB = (name, address, description, latitude, longitude) => {
   checkIfDuplicate(address).then((result)=>{
      if (result[0]['COUNT(*)']==0){
         let template = `
         INSERT INTO BnB (name, address, description, coordinates)
         VALUES ('$NAME', '$ADDRESS', '$DESCRIPTION', (
            SELECT Coordinates.id
             FROM Coordinates  
             WHERE Coordinates.latitude = '$LAT' 
             AND Coordinates.longitude = '$LON' 
             LIMIT 1
             )
             ) 
            `;
         const sql = template.replace("$NAME", name)
         .replace("$ADDRESS", address)
         .replace("$DESCRIPTION", description)
         .replace("$LAT", latitude)
         .replace("$LON", longitude);
         return executeQuery(sql);
      }else{
         console.log(result[0]['COUNT(*)'])
      };
   });
};


app.delete("/delete/:id", (req, res) => {
   deleteElement(req.params.id,"BnB");
    res.json({Result: "Ok"});   
 })

app.delete("/deleteCoords/:id", (req, res) => {
   deleteElement(req.params.id,"Coordinates");
    res.json({Result: "Ok"});   
 })

const deleteElement=(id,table)=>{
   let template = `
   DELETE FROM %TABLE WHERE %TABLE.id=$ID;
      `;
   const sql = template.replace("$ID", id).replace("%TABLE",table).replace("%TABLE",table)
   
   return executeQuery(sql);
};
