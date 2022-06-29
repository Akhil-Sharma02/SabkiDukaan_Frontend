import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./css/Login.module.css";
import { url } from "../BE";

export const SignIn = (props) => {
    const [error, setError] = useState(<></>);
    const usernameref = useRef();
    const passwordref = useRef();
    const navigate = useNavigate();
    const handleLogin = () => {
        if (usernameref.current.value === "") {
            setError(
                <span className={styles.error}>
                    You Did Not Enter Your Username
                </span>
            );
            setTimeout(() => {
                setError(<></>);
            }, 2000);
            return;
        } else if (passwordref.current.value === "") {
            setError(
                <span className={styles.error}>
                    You Did Not Enter Your Password
                </span>
            );
            setTimeout(() => {
                setError(<></>);
            }, 2000);
            return;
        }
        const URL = url + "/login";
        axios
            .post(
                URL,
                {
                    username: usernameref.current.value,
                    password: passwordref.current.value,
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log("Login success");
                console.log(res);
                usernameref.current.value = passwordref.current.value = "";
                props.setUserIn(res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.log("Error login");
                setError(
                    <span className={styles.error}>
                        Username And/Or Password Is Incorrect
                    </span>
                );
                setTimeout(() => {
                    setError(<></>);
                }, 2000);
                console.log(err);
            });
    };
    const goToSignUpHandler = () => {
        navigate("/register");
    };
    console.log("flash here");
    console.log(error);
    return (
        <div className={styles.mainDiv}>
            <div className={styles.loginDiv}>
                <div className={styles.inputs}>
                    <div className={styles.heading}>LOGIN</div>
                    <div className={styles.usernameDiv}>
                        <label
                            htmlFor="username"
                            className={styles.usernameLabel}
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
                    <div className={styles.passwordDiv}>
                        <label
                            htmlFor="password"
                            className={styles.passwordLabel}
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
                    <button className={styles.loginBtn} onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <span className={styles.orDiv}>
                    <hr />
                    OR
                    <hr />
                </span>
                <div className={styles.signUpDiv}>
                    Need An Account?
                    <div
                        className={styles.signUpBtn}
                        onClick={goToSignUpHandler}
                    >
                        SIGN UP
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
