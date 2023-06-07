const express = require('express');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');
const PORT = process.env.PORT || 3000;

app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// lets add up the passord local-strategy

new LocalStrategy(
    function(username, password, done) {
        db.user.findByUsername(username, (err, user) => {
            if(err) return done(err); //if an error is found
            if(!user) return done(null, fale); // user found return NO error and NO user
            if(user.password !=password) return done(null, false); // user found but different password NO error NO user
            return done(null, user); // NO error user found
        })
    }
)