const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoogse = require("mongoose");
const User = mongoogse.model("users");
require('dotenv').config();

const secretOrKey = process.env.secretOrKey

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } 
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};