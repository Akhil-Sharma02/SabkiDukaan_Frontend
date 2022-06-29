import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Signup.module.css";
import { url } from "../BE";

export const SignUp = () => {
    const [error, setError] = useState(<></>);
    const usernameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();
    const navigate = useNavigate();
    const handleRegister = () => {
        const URL = url + "/register";
        axios
            .post(
                URL,
                {
                    username: usernameref.current.value,
                    email: emailref.current.value,
                    password: passwordref.current.value,
                },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data !== "") {
                    if (res.data.message !== undefined) {
                        setError(
                            <span className={styles.error}>
                                {res.data.message}
                            </span>
                        );
                        setTimeout(() => {
                            setError(<></>);
                        }, 2000);
                    } else {
                        setError(<></>);
                        usernameref.current.value =
                            emailref.current.value =
                            passwordref.current.value =
                                "";
                        navigate("/login");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const goToLoginHandler = () => {
        navigate("/login");
    };
    return (
        <div className={styles.mainDiv}>
            <div className={styles.signupDiv}>
                <div className={styles.inputs}>
                    <div className={styles.heading}>SIGN UP</div>
                    <div className={styles.usernameDiv}>
                        <label
                            className={styles.usernameLabel}
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className={styles.usernameInput}
                            ref={usernameref}
                        />
                    </div>
                    <div className={styles.emailDiv}>
                        <label className={styles.emailLabel} htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className={styles.emailInput}
                            ref={emailref}
                        />
                    </div>
                    <div className={styles.passwordDiv}>
                        <label
                            className={styles.passwordLabel}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className={styles.passwordInput}
                            ref={passwordref}
                        />
                    </div>
                    <div className={styles.errorDiv}>{error}</div>
                    <button
                        className={styles.signupBtn}
                        onClick={handleRegister}
                    >
                        Sign Up
                    </button>
                </div>
                <div className={styles.orDiv}>
                    <hr />
                    OR
                    <hr />
                </div>
                <div className={styles.loginDiv}>
                    Already A User?
                    <div className={styles.loginBtn} onClick={goToLoginHandler}>
                        LOGIN
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
