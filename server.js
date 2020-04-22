var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/User');
var Pet = require('./models/Pet')

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('signIn', { layout: 'account' });
})

app.get('/create', (req, res) => {
    res.render('signUp', { layout: 'account' });
})

app.get('/home', (req, res) => {
    res.render('home', { layout: 'main' });
})

app.post('/signup', (req, res) =>{
    const { username, password } = req.body;
    var user = new User({
        username,
        password
    });
    user.save();
    res.redirect('/');
})

app.post('/petadd', (req, res) =>{
    const { name, age, breed } = req.body;
    var pet = new Pet({
        name,
        age,
        breed
    });
    pet.save();
    res.redirect('/home');
})

mongoose.connect('mongodb://localhost:27017/animate', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to the DB');
})
.catch((err) => {
    console.log('Not connected to the DB : ' + err);
})

//listening for requests on port 3000
app.listen(3000, ()=> {
    console.log('Server listening on port 3000');
})