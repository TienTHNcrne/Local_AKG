/** @format */

import { useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAuth } from "../../../Contexts/Auth/Auth";
import axios from "axios";

const GOOGLE_ICON =
    "https://cdn-icons-png.flaticon.com/512/300/300221.png?w=360";
const API_URL = import.meta.env.VITE_BE_URL;

const ERROR_MESSAGES = {
    INVALID_PASSWORD: "Mật khẩu không chính xác",
    LOGIN_ERROR: "Đã xảy ra lỗi. Vui lòng thử lại.",
};

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            notification.warning({
                message: "Vui lòng điền đầy đủ thông tin",
            });
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${API_URL}/v1/api/Login`, {
                email,
                password,
            });

            const { payload, message } = res.data.result;

            if (message === ERROR_MESSAGES.INVALID_PASSWORD) {
                notification.error({
                    message: "Lỗi đăng nhập",
                    description: ERROR_MESSAGES.INVALID_PASSWORD,
                });
                return;
            }

            // Save user info
            localStorage.setItem("name", payload.name);
            localStorage.setItem("email", payload.email);

            // Login & redirect
            login(payload.userId);
            notification.success({
                message: "Đăng nhập thành công!",
            });
            navigate("/");
        } catch (error) {
            notification.error({
                message: ERROR_MESSAGES.LOGIN_ERROR,
                description: error.message || "Không thể kết nối đến máy chủ",
            });
        } finally {
            setIsLoading(false);
        }
    };
    const LoginGG = async () => {
        console.log(`${import.meta.env.VITE_BE_URL}/v1/api/auth/google`);
        window.location.href = `${import.meta.env.VITE_BE_URL}/v1/api/auth/google`;
    };
    return (
        <div className={styles.container}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                {/* Header Section */}
                <div className={styles.header}>
                    <h1 className={styles.title}>AGiLand</h1>
                    <h2 className={styles.subtitle}>Chào mừng trở lại</h2>
                    <p className={styles.description}>
                        Vui lòng đăng nhập để tiếp tục
                    </p>
                </div>

                {/* Form Section */}
                <div className={styles.formGroup}>
                    {/* Email Input */}
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className={styles.inputWrapper}>
                        <label htmlFor="password" className={styles.label}>
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className={styles.optionsRow}>
                        <label className={styles.rememberCheckbox}>
                            <input type="checkbox" defaultChecked />
                            <span>Nhớ tôi trong 30 ngày</span>
                        </label>
                        <Link
                            to="/forgot-password"
                            className={styles.forgotLink}
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className={styles.loginBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {/* Google Login */}
                <div className={styles.divider}>
                    <span>Hoặc</span>
                </div>
                <button
                    type="button"
                    className={styles.googleBtn}
                    onClick={LoginGG}
                >
                    <img src={GOOGLE_ICON} alt="Google" />
                    Đăng nhập bằng Google
                </button>

                {/* Sign Up Link */}
                <div className={styles.signupSection}>
                    <p>Chưa có tài khoản?</p>
                    <Link to="/register" className={styles.signupLink}>
                        Đăng ký ngay
                    </Link>
                </div>
            </form>
        </div>
    );
}
