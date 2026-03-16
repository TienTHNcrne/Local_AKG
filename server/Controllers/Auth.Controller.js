/** @format */

import {
    CreateAccount,
    LoginAccount,
    LoginGoogle,
} from "../services/Auth.service.js";

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
            secure: false,
            sameSite: "lax",
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
        secure: false,
        sameSite: "lax",
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
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 86400000,
    });

    return res.redirect("https://agiland.vn.info.vn/login/success");
};

export { CreateAccountCtrl, loginLocalCtrl, loginGoogleCtrl };
