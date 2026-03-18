import express from "express";
import passport from "../config/passport.js";
import { auth } from "../Middlewares/Auth.middleware.js";
import {
    CreateAccount,
    LoginAccount,
    LoginGoogle,
} from "../services/Auth.service.js";

const route = express.Router();

// REGISTER
const CreateAccountCtrl = async (req, res) => {
    const { name, email, password, role } = req.body;
    const result = await CreateAccount(name, email, password, role);

    if (result.status !== 201 && result.status !== 200) {
        return res.status(result.status).json({ message: result.message });
    }

    // Nếu bạn muốn auto-login sau register:
    if (result.accessToken) {
        res.cookie("token", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 86400000,
        });
    }

    return res.json({ success: true });
};

// LOGIN LOCAL
const loginLocalCtrl = async (req, res) => {
    const { email, password } = req.body;
    const result = await LoginAccount(email, password);

    if (result.status !== 200) {
        return res.status(result.status).json({ message: result.message });
    }

    res.cookie("token", result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 86400000,
    });

    return res.json({ success: true });
};

// LOGIN GOOGLE
const loginGoogleCtrl = async (req, res) => {
    const result = await LoginGoogle(
        req.user,
        JSON.parse(decodeURIComponent(req.query.state || "{}")),
    );

    if (result.status !== 200) {
        return res.redirect(
            `https://agiland.vn.info.vn/login/error?msg=${encodeURIComponent(result.message)}`,
        );
    }

    // Set cookie thay vì gửi token qua URL
    res.cookie("token", result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 86400000,
    });
    return res.redirect("https://agiland.vn.info.vn/login/success");
};

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

route.get("/verify/login", auth, (req, res) => {
    res.json(req.user);
});
route.get("/verify/logout", (req, res) => {
    // passport@0.6+ requires a callback when calling req.logout
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }

        res.clearCookie("connect.sid", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
        });
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
        });

        return res.json({ success: true });
    });
});

export default route;
