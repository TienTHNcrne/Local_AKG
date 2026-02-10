import express from "express";
import passport from "../config/passport.js";
import {
    CreateAccountCtrl,
    loginLocalCtrl,
    loginGoogleCtrl,
} from "../Controllers/Auth.Controller.js";

const route = express.Router();

route.post("/register", CreateAccountCtrl);
route.post("/login", loginLocalCtrl);

route.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

route.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "https://agiland.vn.info.vn/login",
        session: false,
    }),
    loginGoogleCtrl,
);

export default route;
