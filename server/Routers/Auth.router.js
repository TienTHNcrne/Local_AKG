import express from "express";
import passport from "../config/passport.js";
import {
    CreateAccountCtrl,
    loginLocalCtrl,
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
    async (req, res) => {
        const state = req.query.state
            ? JSON.parse(decodeURIComponent(req.query.state))
            : {};

        const result = await LoginGoogle(req.user, state.role);

        const data = {
            token: result.accessToken,
            user: result.payload,
            role: state.role,
        };

        const encoded = encodeURIComponent(JSON.stringify(data));

        return res.redirect(
            `https://agiland.vn.info.vn/login/success?data=${encoded}`,
        );
    },
);

export default route;
