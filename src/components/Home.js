import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./css/Home.module.css";
import { url } from "../BE";

const Home = () => {
    const navigate = useNavigate();
    const [prods, setprods] = useState([]);
    useEffect(() => {
        async function getProds() {
            const URL = url + "/products";
            const res = await axios.get(URL);
            setprods(res.data);
        }
        getProds();
    }, []);
    const handleClick = (id) => {
        const URL = "/product/" + id;
        navigate(URL);
    };
    const handleNavigate = (URL) => {
        navigate(URL);
    };
    return (
        <div className={styles.homeDiv}>
            <ul className={styles.productList}>
                {prods.map((prod) => {
                    return (
                        <li
                            className={styles.product}
                            key={prod._id}
                            onClick={() => handleClick(prod._id)}
                        >
                            <div
                                className={styles.productDiv}
                                onClick={() =>
                                    handleNavigate(`/product/${prod._id}`)
                                }
                            >
                                <div className={styles.imageDiv}>
                                    <img
                                        className={styles.productImage}
                                        src={prod.img}
                                    ></img>
                                </div>
                                <div className={styles.nameDiv}>
                                    <h3 className={styles.productName}>
                                        {prod.name}
                                    </h3>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;
