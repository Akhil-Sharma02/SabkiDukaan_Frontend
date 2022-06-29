import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./css/MyProducts.module.css";
import { url } from "../BE";

const MyProducts = () => {
    const [prods, setprods] = useState([]);
    const [pastProds, setPastProds] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const URL = url + "/userProducts";
        axios
            .get(URL, { withCredentials: true })
            .then((res) => {
                setprods(res.data.products);
                setPastProds(res.data.pastProducts);
            })
            .catch((err) => {
                console.log(err);
                navigate(err.response.data.redirectUrl);
            });
    }, []);
    return (
        <div className={styles.mainDiv}>
            <div className={styles.currentDiv}>
                <h2 className={styles.heading}>
                    Products Currently Up For Bidding
                </h2>
                <div className={styles.currentProductsDiv}>
                    {prods.map((prod, idx) => {
                        return (
                            <div key={idx} className={styles.currentProductDiv}>
                                <div className={styles.contentDiv}>
                                    <img
                                        src={prod.product.img}
                                        className={styles.img}
                                    />
                                    <h3 className={styles.name}>
                                        {prod.product.name}
                                    </h3>
                                </div>
                                <div className={styles.bidDiv}>
                                    <b>Current Bid: </b>Rs.
                                    {prod.product.maxBid}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.pastDiv}>
                <h2 className={styles.heading}>Past Products</h2>
                <div className={styles.pastProductsDiv}>
                    {pastProds.map((prod, idx) => {
                        return (
                            <div key={idx} className={styles.pastProductDiv}>
                                <div className={styles.contentDiv}>
                                    <img
                                        src={prod.img}
                                        className={styles.img}
                                    />
                                    <h3 className={styles.name}>{prod.name}</h3>
                                </div>
                                <div className={styles.bidDiv}>
                                    <b>Sold At: </b>Rs.
                                    {prod.price}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
