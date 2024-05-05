//login
const express = require('express');
const app = express;

const session = require('express-session');
const store = new session.MemoryStore();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db');
const PORT = process.env.PORT || 4001;


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        store,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    db.users.findById(id, function(err, user) {
        if(err) {
            return done(err);

        }
        done(null, user);
    });
});

passport.use(
    new LocalStrategy(function(username, password, cb) {
        db.users.findByUsename(username, function(err, user) {
            if(err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password !=password) {
                return cb(null, false);
            }
            return cb(null, user);
        } );
    })
);

// we do a login with app.post

app.post(
    '/login',
    passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('profile');
    }
    );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})    
