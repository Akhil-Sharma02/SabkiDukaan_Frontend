import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/BidsWon.module.css";
import { url } from "../BE";

const BidsWon = () => {
    const [bids, setBids] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const URL = url + "/getBidsWon";
        axios
            .get(URL, { withCredentials: true })
            .then((res) => {
                console.log("bids get success");
                console.log(res);
                res.data.map((bid) => {
                    setTotal((prevState) => {
                        return prevState + bid.price;
                    });
                });
                setBids(res.data);
            })
            .catch((err) => {
                console.log("get error");
                console.log(err);
            });
    }, []);
    return (
        <div className={styles.mainDiv}>
            <div className={styles.bidsWonDiv}>
                <h2 className={styles.heading}>Bids Won</h2>
                <div className={styles.productsDiv}>
                    {console.log(bids)}
                    {bids.map((bid, idx) => {
                        return (
                            <div key={idx} className={styles.productDiv}>
                                <div className={styles.contentDiv}>
                                    <img src={bid.img} className={styles.img} />
                                    <div className={styles.info}>
                                        <h3 className={styles.name}>
                                            {bid.name}
                                        </h3>
                                        <p>
                                            <b>Sold By:&nbsp;</b>
                                            {bid.byUsername}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.bidDiv}>
                                    <b>Won At:&nbsp;</b>Rs.
                                    {bid.price}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <span className={styles.totalDiv}>
                    <b>Total Money Spent:&nbsp;</b>Rs.{total}
                </span>
            </div>
        </div>
    );
};

export default BidsWon;
