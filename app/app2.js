const express = require('express');
const app = express();

//import Passport and LocalStrategy
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');
const PORT = process.env.PORT || 8000;

app.use(
    session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello from the homepage!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

