import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import axios from "axios";
import { notification } from "antd";
export default function Register() {
    const iconGoogle =
        "https://cdn-icons-png.flaticon.com/512/300/300221.png?w=360";
    const Logo = new URL("../../assets/Logo.png", import.meta.url).href;
    const [role, setRole] = useState("traveler");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const SendRole = async () => {
        const data = { role };
        const encoded = encodeURIComponent(JSON.stringify(data));
        console.log(
            `${import.meta.env.VITE_BE_URL}/v1/api/auth/google?state=${encoded}`,
        );
        window.location.href = `${import.meta.env.VITE_BE_URL}/v1/api/auth/google?state=${encoded}`;
    };
    console.log(import.meta.env.VITE_BE_URL);
    const SumbitForm = async (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/register`, {
                name: formData.username,
                email: formData.email,
                password: formData.password,
                role: role,
            })
            .then((response) => {
                console.log("Registration response:", response.data);
                if (response.data.status === 200) {
                    if (response.data.EC === 0) {
                        alert("Đăng ký thành công! Vui lòng đăng nhập.");
                        window.location.href = "/login";
                    } else if (response.data.EC === 1) {
                        console.log("Email already exists");
                        notification.warning({
                            message: "Cảnh báo",
                            description:
                                "Email đã tồn tại. Vui lòng sử dụng email khác.",
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Registration error:", error);
            });
    };

    return (
        <div className={styles.container}>
            {/* Form đăng ký */}
            <div className={styles.FormRegister}>
                <button className={styles.backHome}>
                    <Link to="/">Quay về trang chủ</Link>
                </button>

                <div className={styles.Register}>
                    <div className={styles.MyBusiness}>
                        <img src={Logo} alt="AGILAND Logo" />
                    </div>

                    <h1>Tạo tài khoản</h1>
                    <p className={styles.subtitle}>
                        Tham gia để khám phá những trải nghiệm tuyệt vời
                    </p>

                    <form className={styles.form} onSubmit={SumbitForm}>
                        <div className={styles.GetInfor}>
                            <label htmlFor="username">Tên người dùng</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Nhập tên người dùng"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className={styles.GetInfor}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Nhập địa chỉ email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className={styles.password}>
                            <div className={styles.GetInfor}>
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className={
                                        formData.password !==
                                        formData.confirmPassword
                                            ? styles.inputError
                                            : ""
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.GetInfor}>
                                <label htmlFor="confirmPassword">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className={
                                        formData.password !==
                                        formData.confirmPassword
                                            ? styles.inputError
                                            : ""
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/*  vai trò */}
                        <div className={styles.roleSelector}>
                            <button
                                type="button"
                                className={
                                    role === "traveler" ? styles.active : ""
                                }
                                onClick={() => setRole("traveler")}
                            >
                                Du khách
                            </button>

                            <button
                                type="button"
                                className={
                                    role === "business" ? styles.active : ""
                                }
                                onClick={() => setRole("business")}
                            >
                                Doanh nghiệp
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={
                                !formData.username ||
                                !formData.email ||
                                !formData.password ||
                                !formData.confirmPassword ||
                                formData.password !== formData.confirmPassword
                            }
                            className={styles.submitBtn}
                        >
                            Đăng ký với vai trò{" "}
                            {role === "business" ? "Doanh nghiệp" : "Du khách"}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>Hoặc tiếp tục với</span>
                    </div>

                    <div className={styles.OthersLogin}>
                        <button
                            type="button"
                            className={styles.GoogleButton}
                            onClick={SendRole}
                        >
                            <img src={iconGoogle} alt="Google Icon" />
                            Đăng nhập bằng Google với vai trò{" "}
                            {role === "business" ? "Doanh nghiệp" : "Du khách"}
                        </button>
                    </div>

                    <div className={styles.loginLink}>
                        Đã có tài khoản? <a href="/login">Đăng nhập</a>
                    </div>
                </div>
            </div>

            {/* Hero bên phải */}
            <div className={styles.ExtendInfor}>
                <h1 className={styles.heroTitle}>title hero</h1>
                <p className={styles.heroSub}>sub description hero</p>

                <div className={styles.roles}>
                    <div
                        className={`${styles.roleCard} ${
                            role === "traveler" ? styles.active : ""
                        }`}
                        onClick={() => setRole("traveler")}
                    >
                        <h3>Du khách</h3>
                        <ul>
                            <li> Gợi ý điểm đến theo sở thích & vị trí</li>
                            <li> Lên lịch trình tự động theo thời gian</li>
                            <li> Ước tính chi phí & tối ưu ngân sách</li>
                            <li> Tối ưu tuyến đường, không đi vòng</li>
                            <li> Trải nghiệm bản đồ 3D trước khi đi</li>
                        </ul>
                    </div>

                    <div
                        className={`${styles.roleCard} ${
                            role === "business" ? styles.active : ""
                        }`}
                        onClick={() => setRole("business")}
                    >
                        <h3>Doanh nghiệp</h3>
                        <ul>
                            <li>
                                Theo dõi dữ liệu du khách theo thời gian thực
                            </li>
                            <li> Bản đồ nhiệt hành vi & điểm đến</li>
                            <li> Báo cáo & dự báo xu hướng bằng AI</li>
                            <li> Tối ưu vị trí, dịch vụ & chiến lược</li>
                            <li> Nền tảng quy hoạch du lịch số</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
