var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var { isAuth } = require('./middleware/isAuth')
var User = require('./models/User');
var Pet = require('./models/Pet')
const port = process.env.port || 3000;
const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/animate';
require('./middleware/passport')(passport);

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.use(express.static('public'));
app.use(session({
    secret: 'mySecret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

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

app.get('/home', isAuth, (req, res) => {
    try {
        Pet.find({ user: req.user.id }).lean()
            .exec((err, pets) => {
                if (pets.length) {
                    res.render('home', { layout: 'main', pets: pets, petsExist: true, userLogged: true, username: req.user.username });
                } else {
                    res.render('home', { layout: 'main', pets: pets, petsExist: false, userLogged: true, username: req.user.username });
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
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

app.post('/signin', (req, res, next) =>{
    try{
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/login?incorrectLogin'
        })(req, res, next);
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/signout', (req, res) =>{
    req.logOut();
    res.redirect('/')
})

app.post('/petadd', (req, res) =>{
    const { name, age, breed } = req.body;
    var pet = new Pet({
        user: req.user.id,
        name,
        age,
        breed
    });
    pet.save();
    res.redirect('/home?petSaved');
})

mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log('Not connected to DB : ' + err);
})

//listening for requests on port 3000
app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})