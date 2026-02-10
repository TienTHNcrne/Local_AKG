/** @format */

import Auth from "../Models/Auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const CreateAccount = async (name, email, password, filter) => {
    try {
        const existingUser = await Auth.findOne({ email: email });
        if (existingUser) {
            return {
                status: 200,
                EC: 1,
                message: "Email đã tồn tại",
            };
        }
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password, saltRounds);
        const user = await Auth.create({
            name,
            password: hashPass,
            email,
            filter,
        });

        return {
            status: 201,
            EC: 0,
            message: "Tạo tài khoản thành công",
            payload: {
                id: user._id,
                name: user.name,
                email: user.email,
                filter: user.filter,
            },
        };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};
const LoginAccount = async (email, password) => {
    try {
        const user = await Auth.findOne({ email: email });
        if (!user) {
            return { status: 200, EC: 1, message: "Không tìm thấy tài khoản" };
        }

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return { status: 200, EC: 1, message: "Mật khẩu không chính xác" };
        }

        const payload = {
            name: user.name,
            email: user.email,
            userId: user._id,
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_DAY,
        });

        return {
            status: 200,
            EC: 0,
            message: "Đăng nhập thành công",
            payload,
            accessToken,
        };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};
const LoginGoogle = async (googleProfile) => {
    try {
        const email = googleProfile.email || googleProfile.emails?.[0]?.value;

        let user = await Auth.findOne({ email });

        // Nếu chưa có → tạo mới
        if (!user) {
            user = await Auth.create({
                name: googleProfile.name || googleProfile.displayName,
                email,
                avatar:
                    googleProfile.avatar || googleProfile.photos?.[0]?.value,
                filter: "google",
            });
        }
        console.log("USER CREATED:", user);

        const payload = {
            name: user.name,
            email: user.email,
            userId: user._id,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_DAY,
        });

        return {
            status: 200,
            EC: 0,
            message: "Đăng nhập Google thành công",
            payload,
            accessToken,
        };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

export { CreateAccount, LoginAccount, LoginGoogle };
