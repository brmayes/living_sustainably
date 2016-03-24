// dependancies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//custom modules
var db = require('./config/db');
var entries = require('./controllers/entries');

//enables packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//use public folder for CSS and all that
app.use(express.static('public'));

//set view engine
app.set('view engine', 'ejs');

//routes
app.get('/', entries.all); //all (list) page (.get('/location of url', jsFile.module))
app.get('/category/:category', entries.category); //show categoty

app.get('/new', entries.form); //new action
app.post('/', entries.create); //new action

app.get('/:id', entries.entry); //show

app.post('/:id', entries.update); //edit action
app.get('/edit/:id', entries.edit); //edit form

app.get('/delete/:id', entries.remove); //delete action

db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
