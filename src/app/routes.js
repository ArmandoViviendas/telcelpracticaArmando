const radios = require('./models/radio.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const csv = require('fast-csv');


module.exports = (app) => {

	// index routes
    app.get('/index', (req, res) => {
          console.log("dentro");
          res.render('index.ejs', {});
    });
    
    app.post('/insertRadio',upload.single("csv-radios"), (req, res) => {
        console.log(req.file.path);
        csv.fromPath(req.file.path).on("data", function (data) {
          //fileRows.push(data); // push each row
          radios.insertExcel(data, function(erro,resultado){
              console.log(resultado);
          });
        })
        .on("end", function () {
          //console.log(fileRows)
          fs.unlinkSync(req.file.path);   // remove temp file
          res.send(200);
          //process "fileRows" and respond
        })        
    });
    app.get('/getAll', (req, res) => {
        radios.getRadios(function(erro, data){
            console.log(erro);
            res.send(data);
        });
    });
    
}
