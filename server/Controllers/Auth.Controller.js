/** @format */

import {
    CreateAccount,
    LoginAccount,
    LoginGoogle,
} from "../services/Auth.service.js";

const CreateAccountCtrl = async (req, res) => {
    console.log("Register data:", req.body);
    const { name, email, password, role } = req.body;
    const result = await CreateAccount(name, email, password, role);
    console.log("CreateAccount result:", result);
    return res.status(result.status).json(result);
};

const loginLocalCtrl = async (req, res) => {
    const { email, password } = req.body;
    const result = await LoginAccount(email, password);
    return res.status(result.status).json(result);
};

const loginGoogleCtrl = async (req, res) => {
    const result = await LoginGoogle(
        req.user,
        JSON.parse(decodeURIComponent(req.query.state || "{}")),
    );

    console.log("LoginGoogle result:", result.payload);
    if (result.status !== 200) {
        return res.redirect(
            `https://agiland.vn.info.vn/login/error?msg=${encodeURIComponent(result.message)}`,
        );
    }
    const data = {
        token: result.accessToken,
        user: result.payload,
    };

    const encoded = encodeURIComponent(JSON.stringify(data));

    return res.redirect(
        `https://agiland.vn.info.vn/login/success?data=${encoded}`,
    );
};

export { CreateAccountCtrl, loginLocalCtrl, loginGoogleCtrl };
