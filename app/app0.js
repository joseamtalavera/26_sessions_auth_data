const express = require("express");
const app = express();
const session = require("express-session");
const store = new session.MemoryStore();

//very important info from Passportjs.org ***********


const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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


// serialize and deserialize

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Look up user id in database.
  db.users.findById(id, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});



passport.use(
  new LocalStrategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);


//this code is attempting to log out a user using passport-local

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  // Pass user object stored in session to the view page:
  res.render("profile", {user: req.user});
});

// Add the passport middleware below:
app.post(
  "/login",
  passport.authenticate("local", {failureRedirect: "/login "}),
  (req, res) => {
    res.redirect("profile");
  }
);

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const {username, password } = req.body;

  const newUser = await db.users.createUser({
    username, password});

    if(newUser) {
      res.status(201).json ({
        mgs: "Successful!",
        newUser
      });
    } else {
      res.status(500).json({msg: "Failure!"})
    }

});










app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});