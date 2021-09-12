var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./model/users');


passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());