/** @format */

import {
    CreateAccount,
    LoginAccount,
    LoginGoogle,
} from "../services/Auth.service.js";

const CreateAccountCtrl = async (req, res) => {
    const { name, email, password, filter } = req.body;
    const result = await CreateAccount(name, email, password, filter);
    return res.status(result.status).json(result);
};

const loginLocalCtrl = async (req, res) => {
    const { email, password } = req.body;
    const result = await LoginAccount(email, password);
    return res.status(result.status).json(result);
};

const loginGoogleCtrl = async (req, res) => {
    console.log("Google profile:", req.user);
    const result = await LoginGoogle(req.user);

    if (result.status !== 200) {
        return res.redirect(
            `https://agiland.vn.info.vn/login/error?msg=${encodeURIComponent(result.message)}`,
        );
    }

    return res.redirect(
        `https://agiland.vn.info.vn/login/success?token=${result.accessToken}`,
    );
};

export { CreateAccountCtrl, loginLocalCtrl, loginGoogleCtrl };
