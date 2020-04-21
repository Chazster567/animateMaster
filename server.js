var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Contact = require('./models/Contact');
var User = require('./models/User');

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('login', { layout: 'main' });
})

app.get('/dashboard', (req, res) => {
    Contact.find({}).lean()
    .exec((err, contacts) => {
        if(contacts.length){
            res.render('dashboard', { layout: 'main', contacts: contacts, contactsExist: true });
        } else{
            res.render('dashboard', { layout: 'main', contacts: contacts, contactsExist: false });
        }
    })
});

app.post('/addContact', (req, res) =>{
    const { name, email, number } = req.body;
    var contact = new Contact({
        name,
        email,
        number
    });
    contact.save();
    res.redirect('/');
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

app.get('/login', (req, res) => {
    res.render('login', { layout: 'main' });
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