const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/user');
const config = require('../config/database');

module.exports = async function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        console.log(jwt_payload.user);
        console.log(jwt_payload.user._id);
        const user = await User.findById(jwt_payload.user._id);
        console.log(user);
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }));
}