import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import PostProduct from "./components/PostProduct";
import Product from "./components/Product";
import Navigation from "./components/UI/Navigation";
import axios from "axios";
import MyProducts from "./components/MyProducts";
import BidsWon from "./components/BidsWon";
import styles from "./App.module.css";
import { url } from "./BE";

const App = () => {
    const defUser = {
        _id: "",
        username: "",
        email: "",
        products: [],
        bidsWon: [],
    };
    const [currUser, setCurrUser] = useState(defUser);
    const setUserIn = (data) => {
        const user = {
            _id: data._id,
            username: data.username,
            email: data.email,
            products: data.products,
            bidsWon: data.bidsWon,
        };
        setCurrUser(user);
    };
    const setUserOut = () => {
        console.log("setting user out");
        setCurrUser(defUser);
    };
    useEffect(() => {
        const URL = url + "/getuser";
        axios
            .get(URL, { withCredentials: true })
            .then((res) => {
                console.log("gte success");
                console.log(res);
                console.log(res.data);
                if (res.data != "") setCurrUser(res.data);
            })
            .catch((err) => {
                console.log("get error");
                console.log(err);
            });
    }, []);
    const isLoggedIn = currUser._id == "" ? false : true;
    console.log("IsLoggedIN " + isLoggedIn);
    console.log("currUser._id " + currUser._id);
    return (
        <div>
            <div className={styles.navDiv}>
                <Navigation
                    isLoggedIn={isLoggedIn}
                    setUserOut={setUserOut}
                ></Navigation>
            </div>
            <div className={styles.contentDiv}>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/post"
                        element={<PostProduct _id={currUser._id} />}
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                isLoggedIn={isLoggedIn}
                                setUserIn={setUserIn}
                            />
                        }
                    />
                    <Route path="/register" element={<SignUp />} />
                    <Route
                        path="/product/:id"
                        element={
                            <Product
                                _id={currUser._id}
                                username={currUser.username}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route path="/my-products" element={<MyProducts />} />
                    <Route path="/my-bids" element={<BidsWon />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
