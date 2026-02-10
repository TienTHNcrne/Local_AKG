import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/Auth/Auth";
export default function LoginSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy data từ URL
        const params = new URLSearchParams(window.location.search);
        const data = params.get("data");
        const { setUserId } = useAuth();

        if (data) {
            try {
                const decoded = JSON.parse(decodeURIComponent(data));

                // Lưu vào localStorage
                localStorage.setItem("token", decoded.token);
                localStorage.setItem("user", JSON.stringify(decoded.user));
                localStorage.setItem("userid", decoded.user.userId);
                setUserId(decoded.user.userId);
                console.log(
                    "Login OK:",
                    decoded.user.userId,
                    " ",
                    localStorage.getItem("userid"),
                );
            } catch (err) {
                console.error("Parse login data failed:", err);
            }
        }

        // Redirect về trang chủ
        const timer = setTimeout(() => {
            navigate("/", { replace: true });
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return <div>Đang đăng nhập...</div>;
}
