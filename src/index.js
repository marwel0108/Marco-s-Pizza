const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const Handlebars = require('handlebars');
const morgan = require('morgan');
const { portNumber } = require('./keys/keys').port;
const { database } = require('./keys/keys');

// Inicializaciones

const app = express();

// Setting

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middleware

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(myConnection(mysql, database, 'single'));

// routes

app.use(require('./routes/pizzas'));

// static files

app.use(express.static(path.join(__dirname, 'public')));


// Server running

app.listen(portNumber, () => {
    console.log('Server listen on port: ', portNumber);
});

// Handlebars Helpers

Handlebars.registerHelper('cambioImporte', (precio) => precio * 100);