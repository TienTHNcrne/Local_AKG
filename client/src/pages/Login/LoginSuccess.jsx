import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return <div>Đang đang nhập .... </div>;
}
