var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bcrypt = require('bcryptjs');
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

app.get('/login', (req, res) => {
    res.render('signIn', { layout: 'account' });
})

app.get('/create', (req, res) => {
    res.render('signUp', { layout: 'account' });
})

app.get('/', (req, res) => {
    res.render('home', { layout: 'main' });
})

app.post('/signup', async (req, res) =>{
    const { username, password } = req.body;
    try{
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).render('signIn', { layout: 'account', userExist: true });
        }
        user = new User({
            username,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).render('signIn', { layout: 'account', userDoesNotExist: true });
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

app.post('/signin', async (req, res) =>{
    const { username } = req.body;
    try{
        let user = await User.findOne({ username });

        if (user) {
            return res.status(200).render('home', { layout: 'main', userExist: true, userName: user.username });
        }

        res.status(400).render('signIn', { layout: 'account', userDoesNotExist: true });
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

app.post('/petadd', (req, res) =>{
    const { name, age, breed } = req.body;
    var pet = new Pet({
        name,
        age,
        breed
    });
    pet.save();
    res.redirect('/');
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