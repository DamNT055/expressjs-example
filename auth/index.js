"use strict";

var express = require("express");
var hash = require("pbkdf2-password")();
var path = require("path");
var session = require("express-session");
var morgan = require("morgan");

var app = (module.exports = express());

// config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "hmmm we are thinking",
  })
);

// session
app.use((req, res, next) => {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

// dummy database
var users = {
  tj: { name: "tj" },
};

// hash password
hash({ password: "foobar" }, function (err, pass, salt, hash) {
  if (err) throw err;
  users.tj.salt = salt;
  users.tj.hash = hash;
});

// authenticate using our plain-object database
function authenticate(name, pass, fn) {
  if (!module.parent) console.log("authenticating %s:%s", name, pass);
  var user = users[name];
  if (!user) return fn(null, null);
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) throw err;
    if (hash === user.hash) return fn(null, user);
    fn(null, null);
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/login");
  }
}

// routing
app.get("/", (req, res) => {
  res.redirect("/login");
});
app.get("/login", (req, res) => {
  res.render("template");
});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
app.post("/login", function (req, res, next) {
  authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) return next(err);
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function () {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success =
          "Authenticated as " +
          user.name +
          ' click to <a href="/logout">logout</a>. ' +
          ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect("back");
      });
    } else {
      req.session.error =
        "Authentication failed, please check your " +
        " username and password." +
        ' (use "tj" and "foobar")';
      res.redirect("/login");
    }
  });
});

// listen
if (!module.parent) {
  app.listen(3000, () => {
    console.log("Express started on port 3000");
  });
}
