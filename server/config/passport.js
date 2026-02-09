import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://akg-rfjj.onrender.com/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // TODO: lưu user vào DB
                return done(null, profile);
            } catch (err) {
                done(err, null);
            }
        },
    ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
