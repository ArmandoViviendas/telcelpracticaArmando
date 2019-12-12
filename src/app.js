const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const server = app.listen(4000);

const { url } = require('./config/database.js');

mongoose.connect(url, (err,res)=> {
	if(err) throw err
	console.log("Conexion establecida");
})



// settings
app.set('port', process.env.PORT || server);
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({extended: true}));
// required for passport

app.use(flash());

app.use(express.json());       // to support JSON-encoded bodies

// routes
require('./app/routes.js')(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));

});
