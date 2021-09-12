const express = require('express');
const Users = require('../model/users');
const userRouter = express.Router();

userRouter.route('/login').get((req, res, next) => {

    // Check if existing a session
    if (!req.session.user) {
        // Check if the user sent login information
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            let err = new Error('You need to submit login information (username and password)');
            err.status = 401;
            next(err);
            return;
        }

        // Try to login the user
        var auth = (new Buffer.from(authHeader.split(' ')[1], 'base64')).toString().split(':');
        var username = auth[0];
        var password = auth[1];

        // Check if username exists
        Users.findOne({ username: username }).then((user) => {
            if (user) {
                // Check if password matches
                if (user.password === password) {
                    // Set session's user on server-side 
                    req.session.user = username;
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You have been logged in');
                }
                else {
                    var error = new Error('Wrong password');
                    error.status = 401;
                    throw error;
                }
            }
            else {
                let error = new Error('User does not exists');
                error.status = 401;
                throw error;
            }
        }).catch((err) => {
            console.log(err);
            next(err);
        });
    }
    else {
        // Make sure that the session.user exists
        Users.findOne({ username: req.session.user }).then((user) => {
            if (user) {
                res.statusCode = 200;
                res.end('You are already logged in');
            } else {
                res.clearCookie('session-id');
                req.session.destroy();
                console.log(err);
                let error = new Error('Invalid session, resetting cookie');
                error.status = 401;
                next(error);
            }
        }).catch(err => {
            console.log(err);
            next(err);
        });
    }

});

userRouter.route('/signup').get((req, res, next) => {
    if (!req.session.user) {
        // Check if the user sent sign up information
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            let err = new Error('You need to submit register information (username and password)');
            err.status = 401;
            next(err);
            return;
        }

        // Try to sign up the user
        var auth = (new Buffer.from(authHeader.split(' ')[1], 'base64')).toString().split(':');
        var username = auth[0];
        var password = auth[1];

        //Check if username exists
        Users.findOne({ username }).then(user => {
            if (user) {
                let error = new Error('Username already exists');
                error.status = 401;
                throw error;
            } else {
                // Try to sign up
                return Users.create({
                    username: username,
                    password: password,
                });
            }
        }).then((user) => {
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            } else {
                console.log(err);
                let error = new Error('Invalid Username or Password : must be over 6 characters');
                error.status = 403.10;
                throw error;
            }
        }).catch(err => {
            console.log(err);
            next(err);
        });

    }
    else {
        // Session exists
        Users.findOne({ username: req.session.user }).then((user) => {
            let error = new Error('You are already logged in.');
            error.status = 405;
            throw error;
        }).catch(err => {
            console.log(err);
            next(err);
        });
    }
});

userRouter.route('/logout').get((req, res, next) => {
    // Check login status
    if (req.session.user) {
        res.clearCookie('session-id');
        req.session.destroy();
        res.redirect('/');
    } else {
        let error = new Error('You have not logged in yet');
        error.status = 403;
        next(error);
    }
});

module.exports = userRouter;