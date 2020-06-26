import mongoose from "mongoose";
import JWT from "passport-jwt";
import { SECRET_KEY } from "./keys.js";
const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;
const User = mongoose.model("User");

const configPassport = function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET_KEY;
  passport.use(
    new JwtStrategy(opts, function (decodedToken, done) {
      User.findById(decodedToken.id)
        .then((user) => done(null, user))
        .catch((err) => done(err, false));
    })
  );
};

export { configPassport };
