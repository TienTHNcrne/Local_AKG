import users from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
export const CreateUserService = async (name, email, password) => {
    //create an Object
    try {
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password, saltRounds);
        //save account
        return await users.create({
            name: name,
            password: hashPass,
            email: email,
        });
    } catch (error) {
        console.log("Can't create an account, ", error);
        return null;
    }
};
export const FindUserService = async (email, password) => {
    try {
        const user = await users.findOne({ email: email });
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
        const accessToken = jwt.sign(payload, process.env.JWT_SCRET, {
            expiresIn: process.env.JWT_DAY,
        });

        return {
            status: 200,
            EC: 2,
            message: "Đăng nhập thành công",
            payload,
            accessToken,
        };
    } catch (error) {
        console.log("Lỗi FindUserService:", error);
    }
};
