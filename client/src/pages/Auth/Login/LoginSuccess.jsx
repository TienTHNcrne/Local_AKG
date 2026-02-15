import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/Auth/Auth";
export default function LoginSuccess() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/api/verify/login`, {
                withCredentials: true,
            })
            .then((res) => {
                const user = res.data;
                console.log("user", res.data);
                setUser(res.data);
                if (user.role === "admin")
                    navigate("/admin", { replace: true });
                else navigate("/", { replace: true });
            })
            .catch(() => navigate("/login"));
    }, []);

    return <div>Signing you in...</div>;
}
