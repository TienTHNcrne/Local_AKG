/** @format */

import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { message, notification } from "antd";
import { useAuth } from "../../Contexts/Auth/Auth";
import axios, { Axios } from "axios";
export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const nextPage = useNavigate();
    const { login } = useAuth();
    const submit = (e) => {
        e.preventDefault();
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/Login`, {
                email: email,
                password: pass,
            })
            .then((res) => {
                if (res.data.result.message === "Mật khẩu không chính xác") {
                    notification.error({
                        description: "Mật Khẩu không chính xác",
                    });
                    window.alert("Mật khẩu không chính xác");
                    return;
                } else {
                    localStorage.setItem("name", res.data.result.payload.name);
                    localStorage.setItem(
                        "email",
                        res.data.result.payload.email
                    );

                    console.log(res);
                    login(res.data.result.payload.userId);
                    nextPage("/");
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={styles.Login}>
            <form className={styles.Login_form}>
                <div className={styles.intro}>
                    <p>Please enter your details </p>
                    <h2>Welcome back</h2>
                    <hr></hr>
                </div>
                <div className={styles.content}>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        className={styles.email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        className={styles.password}
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                    <div className={styles.inform}>
                        <div className={styles.rem}>
                            <input
                                type="checkbox"
                                value="remember"
                                id="remember"
                            />
                            <label htmlFor="remember">
                                Remember for 30 days
                            </label>
                        </div>
                        <a href="/" className={styles.forgot}>
                            Forgot password
                        </a>
                    </div>
                </div>
                <div className={styles.end}>
                    <button onClick={submit}>Sign in</button>
                    <div className={styles.add}>
                        <p>Don't have an account? </p>
                        <Link to="/Register">Sign up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
