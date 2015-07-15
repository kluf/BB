var express = require('express');
var path = require('path');
var Bourne = require('bourne');
var fs = require('fs');
var fsx = require('fs.extra');
var app = express();
/* specific code for image shared app */

var passport = require('passport');
var signin = require('./signin');

var users = new Bourne("users.json");
var photos = new Bourne("photos.json");
var comments = new Bourne("comments.json");

passport.use(signin.strategy(users));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.multipart());
app.use(express.cookieParser());
app.use(express.session({secret: 'photo-application'}));
passport.serializeUser(signin.serialize);
passport.deserializeUser(signin.deserialize(users));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

/* end of specific code */


app.get('/login', function(req, res) {
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/create', function(req, res, next) {
    var userAttrs = {
        username: req.body.username,
        passwordHash: signin.hashPassword(req.body.password),
        following: []
    };
    users.findOne({username: userAttrs.username}, function(existingUser) {
        if (!existingUser) {
            users.insert(userAttrs, function(user) {
                req.login(user, function(err) {
                    res.redirect('/');
                });
            });
        } else {
            res.redirect('/');
        }
    });
});

function followingPhotos(user, callback) {
    var allPhotos = [];
    user.following.forEach(function(f) {
        photos.find({userId: f}, function(err, photos) {
            allPhotos = allPhotos.concat(photos);
        });
    });
    callback(allPhotos);
}

app.post('/photos', function(req, res) {
    var oldPath = req.files.file.path,
        publicPath = path.join('images', req.user.id + "_" + (photos.data.length + 1) + ".jpg"),
        newPath = path.join(__dirname, "public", publicPath);
        var is = fs.createReadStream(oldPath);
        var os = fs.createWriteStream(newPath);
        is.pipe(os);
        is.on('end',function() {
            photos.insert({
                userId: req.user.id,
                path: '/' + publicPath,
                caption: req.body.caption,
                username: req.user.username}, function(err, photo) {
                    res.send(photo);
            });
        });
        fs.unlinkSync(oldPath);
});

app.get('/photos/:id/comments', function(req, res) {
    console.log(req.params.id);
    comments.find({photoId: parseInt(req.params.id, 10)},
        function(err, comments) {
            res.json(comments);
        });
});

app.get(/\/photos(\/)?([\w\/]+)?/, function(req, res) {
    var getting = req.params[1],
        match;
    if (getting) {
        if (!isNaN(parseInt(getting, 10))) {
            photos.findOne({id: parseInt(getting, 10)},
                function(err, photo) {
                    res.json(photo);
                });
        } else {
            match = getting.match(/user\/(\d+)?/);
            if (match) {
                photos.find({userId: parseInt(match[1], 10)},
                    function(photos) {
                        res.json(photos);
                    });
            } else if(getting === 'following') {
                followingPhotos(req.user, function(allPhotos) {
                    res.json(allPhotos);
                });
                // var allPhotos = [];
                // req.user.following.forEach(function(f) {
                //     photos.find({userId: f}, function(photos) {
                //         allPhotos = allPhotos.concat(photos);
                //     });
                // });
                // res.json(allPhotos);
            } else {
                res.json({});
            }
        }
    } else {
        res.json({});
    }
});

app.get('/users.json', function(req, res) {
    users.find(function(err, users) {
        res.json(users.map(safe));
    });
});

app.get('/user-:id.json', function(req, res) {
    users.findOne({id: parseInt(req.params.id, 10)}, function(user) {
        res.json(user);
    });
});

app.delete('/follow/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var index = req.user.following.indexOf(id);
    if (index !== -1) {
        req.user.following.splice(index, 1);
        users.update({id: req.user.id}, req.user, function(err, users) {
            res.json(safe(users[0]));
        });
    } else {
        res.json(safe(req.user));
    }
});

app.post('/follow', function(req, res) {
    var id = parseInt(req.body.userId, 10);
    if (req.user.following.indexOf(id) === -1) {
        req.user.following.push(id);
        users.update({id: req.user.id}, req.user, function(err, users) {
            res.json(safe(users[0]));
        });
    } else {
        res.json(safe(user));
    }
});


app.post('/photos/:id/comments', function(req, res) {
    var comment = {
        text: req.body.text,
        photoId: req.body.photoId,
        username: req.body.username
    };
    comments.insert(comment, function(data) {
        res.json(data);
    });
});

app.get('/*', function(req, res) {
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    followingPhotos(req.user, function(followingPhotos) {
        photos.find({userId: req.user.id}, function(photos) {
            res.render('index.ejs', {user: JSON.stringify(safe(req.user)),
                                        userPhotos: JSON.stringify(photos),
                                        followingPhotos: JSON.stringify(followingPhotos)
            });
        });
    });
});

function safe(user) {
    var toHide = ['passwordHash'],
        clone = JSON.parse(JSON.stringify(user));
    toHide.forEach(function(prop) {
        delete clone[prop]
    });
    return clone;
}

app.listen(3000);