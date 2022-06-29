import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../../assets/Logo1.png";
import { url } from "../../BE";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navigation = (props) => {
    const navigate = useNavigate();
    const [authBtns, setAuthBtns] = useState();
    const [btn, setBtn] = useState(<></>);
    const [show, setShow] = useState(false);
    const isLoggedIn = props.isLoggedIn;
    const handleLogOut = async () => {
        const URL = url + "/logout";
        console.log("in log out ", URL);
        await axios
            .get(URL, { withCredentials: true })
            .then((res) => {
                console.log("Logged out");
                console.log(res);
                props.setUserOut();
            })
            .catch((err) => {
                console.log("error Logged out");
                console.log(err);
            });
        navigate("/login");
        setShow(false);
    };
    const changeShowState = () => {
        setShow(false);
    };
    const handlePushToggle = () => {
        setShow((prevState) => {
            return !prevState;
        });
    };
    useEffect(() => {
        if (!isLoggedIn) {
            setAuthBtns(
                <>
                    <Link to="/login" onClick={changeShowState}>
                        Sign In
                    </Link>
                    <Link to="/register" onClick={changeShowState}>
                        Sign Up
                    </Link>
                </>
            );
            setBtn(<></>);
        } else {
            setAuthBtns(
                <a className={styles.logoutBtn} onClick={handleLogOut}>
                    Log Out
                </a>
            );
            setBtn(
                <>
                    <Link to="/my-products" onClick={changeShowState}>
                        My Products
                    </Link>
                    <Link to="/my-bids" onClick={changeShowState}>
                        Bids Won
                    </Link>
                    <Link to="/post" onClick={changeShowState}>
                        Add Your Product
                    </Link>
                </>
            );
        }
    }, [isLoggedIn]);
    return (
        <div className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logoDiv}>
                    <img src={logo} className={styles.logo}></img>
                </div>
            </div>
            <div className={show ? styles.bottom : styles.right}>
                <Link to="/home" onClick={changeShowState}>
                    Home
                </Link>
                {btn}
                {authBtns}
            </div>
            <div className={styles.moreBtnDiv} onClick={handlePushToggle}>
                {show ? (
                    <ImCross className={styles.crossBtn} />
                ) : (
                    <GiHamburgerMenu className={styles.hamburgerBtn} />
                )}
            </div>
        </div>
    );
};

export default Navigation;
