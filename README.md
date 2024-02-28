# progettobnb
progettobnb/project/conf.js

const fs = require('fs');
module.exports = {
   "host": "%host",
   "user": "%user",
   "password": "%password",
   "database": "%database",
    "port": %port,
  "ssl": {
    "ca" : fs.readFileSync('%cafile'),
    "rejectUnauthorized": true
  }
}