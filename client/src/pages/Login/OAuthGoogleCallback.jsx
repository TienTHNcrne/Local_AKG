import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuthGoogleCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const error = params.get("error");

        if (error) {
            alert("Đăng nhập Google thất bại!");
            return navigate("/login");
        }

        if (!token) {
            alert("Không nhận được token!");
            return navigate("/login");
        }

        // Lưu token
        localStorage.setItem("access_token", token);

        // Gọi API lấy user
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/"); // hoặc /dashboard
            })
            .catch(() => {
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Đang đăng nhập bằng Google...</h2>
        </div>
    );
}
