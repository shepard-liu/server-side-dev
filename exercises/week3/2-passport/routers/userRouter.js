const express = require('express');
const Users = require('../model/users');
const userRouter = express.Router();
const passport = require('passport');

userRouter.route('/login').post(passport.authenticate('local'), (req, res) => {
    console.log('Incoming User:', req.user);
    res.statusCode = 200;
    res.end('You are logged in.');
});

userRouter.route('/signup').post((req, res, next) => {
    if (!req.user) {
        Users.register(new Users({ username: req.body.username }), req.body.password).then((user) => {
            //login after register
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: "Registration Successful!" });
            })
        }).catch(err => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json(err);
        });
    }
    else {
        // Session exists
        Users.findOne({ username: req.user.username }).then((user) => {
            let error = new Error('You are already logged in.');
            error.status = 405;
            throw error;
        }).catch(err => {
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