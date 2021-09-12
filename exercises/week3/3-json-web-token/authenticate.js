var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./model/users');
var jwtStrategy = require('passport-jwt').Strategy;
var JWT = require('jsonwebtoken');
var jwtExtractor = require('passport-jwt').ExtractJwt;

var config = require('./config');

passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.generateToken = (user) => {
    return JWT.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

passport.use(new jwtStrategy({
    secretOrKey: config.secretKey,
    jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
    console.log(payload);

    Users.findById(payload._id).then((user) => {
        if (user) done(null, user);
        else done(null, false);
    }).catch((err) => { done(err, false); })
}))

exports.verifyUser = passport.authenticate('jwt', { session: false });