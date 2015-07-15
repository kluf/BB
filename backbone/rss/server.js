var express = require('express');
var passport = require('passport');
var signin = require('./signin.js');
var path = require('path');
var Bourne = require('bourne');
var app = express();
var users = new Bourne('users');
var Podcasts = require('./podcast');
app.use(express.urlencoded());
app.use(express.json());
app.use(express.multipart());
app.use(express.cookieParser());
app.use(express.session({secret: 'podcast-app'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
passport.use(signin.strategy(users));
passport.serializeUser(signin.serialize);
passport.deserializeUser(signin.deserialize(users));

app.get('/login', function(req, res) {
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/create', function(req, res, next) {
    var userAttrs = {
        username: req.body.username,
        passwordHash: signin.hashPassword(req.body.password)
    }
    users.findOne({username: userAttrs.username}, function(existingUser) {
        if (!existingUser) {
            users.insert(userAttrs, function(err, user) {
                req.login(user, function(err) {
                    res.redirect('/')
                });
            });
        } else {
            res.redirect('/');
        }
    });
});

app.post('/podcasts', function(req, res) {
    console.log(req.body.feed);
    // var podcast = req.user.podcasts.get(req.body.feed);
    // podcast.info.then(res.json.bind(res));
});

app.get('/', function(req, res) {
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    req.user.podcasts = new Podcasts(req.user.id);
    req.user.podcasts.all().then(function(records) {
        res.render("index.ejs", {
            podcasts: JSON.stringify(records),
            username: req.user.username
        });
    })
});

app.listen(3000);