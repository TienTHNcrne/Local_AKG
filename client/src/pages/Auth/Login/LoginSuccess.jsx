import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function LoginSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const state = searchParams.get("data")
            ? JSON.parse(decodeURIComponent(searchParams.get("data")))
            : {};
        console.log("LoginSuccess state:", state);
        localStorage.setItem("token", state.token);
        localStorage.setItem("name", state.user.name);
        localStorage.setItem("email", state.user.email);
        localStorage.setItem("userId", state.user.userId);
        localStorage.setItem("role", state.user.role);
        navigate("/", { replace: false });
        window.location.reload();
    }, []);
    return <div> </div>;
}
