//variables declared and libraries required
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//pulls in the authentication code from the middleware folder
var { isAuth } = require('./middleware/isAuth');

//requires the user, pet and reminder models
var User = require('./models/User');
var Pet = require('./models/Pet');
var Reminder = require('./models/Reminder');

//declares that the port in use is either the hosted port or port 3000
const port = process.env.PORT || 3000;
//declares the database is either Mongo Atlas or MongoDB locally, brings in passport file from middleware
const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/animate';
require('./middleware/passport')(passport);

app.set('view engine', 'hbs');

//states the use of handlebars and declares the directory of layout files
app.engine('hbs', handlebars({
    layoutDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

//stops the site from timing out too quickly, allows data to be overwritten
app.use(express.static('public'));
app.use(session({
    secret: 'mySecret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//initialises passport
app.use(passport.initialize());
app.use(passport.session());

//use of bodyParser for json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//renders sign in page with /login url extension
app.get('/login', (req, res) => {
    res.render('signIn', { layout: 'account' });
})

//renders sign up page with /create url extension
app.get('/create', (req, res) => {
    res.render('signUp', { layout: 'account' });
})

//renders home page
app.get('/', (req, res) => {
    res.render('home', { layout: 'main' });
})

//renders the home page with different outcomes dependent on the existence of previous database entries
app.get('/home', isAuth, (req, res) => {
    try {
        Pet.find({ user: req.user.id }).lean()
            .exec((err, pets) => {
                if (pets.length) {
                    Reminder.find({ user: req.user.id }).lean()
                    .exec((err, reminders) => {
                        if (reminders.length) {
                        res.render('home', { layout: 'main', reminders: reminders, remindersExist: true, pets: pets, petsExist: true, userLogged: true, username: req.user.username });
                        } else {
                        res.render('home', { layout: 'main', reminders: reminders, remindersExist: false, pets: pets, petsExist: true, userLogged: true, username: req.user.username });
                        }
                    });
                } else {
                    res.render('home', { layout: 'main', pets: pets, petsExist: false, userLogged: true, username: req.user.username });
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

//signup button is pressed and user is saved unless there is an existing user, they are then redirected to the sign in page
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

//if user exists they are redirected to home page, if not they are told to create an account
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

//user is logged out and taken back to the start page
app.get('/signout', (req, res) =>{
    req.logOut();
    res.redirect('/')
})

//saves pet to database when added via form
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

//saves reminder to database when added via form
app.post('/reminder', (req, res) =>{
    const { pet, event, time } = req.body;
    var reminder = new Reminder({
        user: req.user.id,
        pet,
        event,
        time
    });
    reminder.save();
    res.redirect('/home?reminderSaved');
})

//checks for a connection to the database
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