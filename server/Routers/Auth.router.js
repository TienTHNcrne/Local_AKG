import express from "express";
import passport from "../config/passport.js";
import {
    CreateAccountCtrl,
    loginLocalCtrl,
    loginGoogleCtrl,
} from "../Controllers/Auth.Controller.js";
import { LoginGoogle } from "../services/Auth.service.js";
const route = express.Router();

route.post("/register", CreateAccountCtrl);
route.post("/login", loginLocalCtrl);
route.get("/auth/google", (req, res, next) => {
    console.log("Google auth request, state:", req.query.state);

    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: req.query.state,
        session: false,
    })(req, res, next);
});

route.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    loginGoogleCtrl,
);

export default route;
