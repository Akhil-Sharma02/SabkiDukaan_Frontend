import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import styles from "./css/Product.module.css";
import { url } from "../BE";
const socket = io.connect(url);

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [currUser, setCurrUser] = useState(props);
    const [bids, setBids] = useState([]);
    const [maxBid, setMaxBid] = useState(0);
    const [isOwner, setOwner] = useState(false);
    const [error, setError] = useState(<></>);
    const { id } = useParams();
    const bidref = useRef();
    const navigate = useNavigate();
    const handleClick = () => {
        let bidval = parseInt(bidref.current.value);
        bidref.current.value = "";
        if (bidval > maxBid && bidval < Number.MAX_VALUE && props.isLoggedIn) {
            socket.emit("bid-entered", {
                value: bidval,
                id: id,
                byUsername: props.username,
                byId: props._id,
            });
            setMaxBid(bidval);
        }
    };
    const deleteHandler = async () => {
        const URL = url + "/product/" + id;
        await axios
            .delete(URL, { withCredentials: true })
            .then((res) => {
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const sellHandler = async () => {
        if (bids.length > 0) {
            setError(<></>);
            const URL = url + "/sellproduct/" + id;
            await axios
                .get(URL, { withCredentials: true })
                .then((res) => {
                    socket.emit("product-sold", {
                        id: id,
                        maxBidUser: bids[0].byUsername,
                        byUsername: product.byUsername,
                    });
                    navigate("/my-products");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setError(<h4>No One Has Bid On The Product Yet</h4>);
            setTimeout(() => {
                setError(<></>);
            }, 2000);
        }
    };
    useEffect(() => {
        socket.on("bid-received", (data) => {
            setMaxBid(data[0].qty);
            setBids(data);
        });

        socket.emit("join-product", {
            id: id,
        });
        socket.on("product-sold-received", (data) => {
            if (data.maxBidUser === props.username) {
                let message =
                    "Congratulations! You have won this product's bid.";
                alert(message);
            } else if (data.byUsername !== currUser.username) {
                let message =
                    "This Product has been sold by the user to the maximum Bidder. Better Luck Next Time.";
                alert(message);
            }
            navigate("/home");
        });
    }, [socket]);
    useEffect(() => {
        if (props._id === "") {
            async function getUser() {
                const URL = url + "/getuser";
                await axios
                    .get(URL, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        if (res.data !== "") {
                            let user = {
                                _id: res.data._id,
                                username: res.data.username,
                                isLoggedIn: true,
                            };
                            setCurrUser(user);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            getUser();
        }
        async function getProd() {
            const URL = url + "/product/" + id;
            await axios.get(URL).then((res) => {
                setProduct(res.data);
                if (res.data.bids.length > 0) {
                    let newarr = res.data.bids.slice();
                    setBids(newarr);
                }
                setMaxBid(res.data.maxBid);
            });
        }
        getProd();
    }, []);
    useEffect(() => {
        if (
            currUser !== undefined &&
            product !== undefined &&
            currUser._id === product.byId
        ) {
            setOwner(true);
        }
    }, [product, currUser]);
    return (
        <div className={styles.mainDiv}>
            <div className={styles.heading}>
                <h1>{product.name}</h1>
            </div>
            <div className={styles.productDiv}>
                <div className={styles.first}>
                    <img className={styles.img} src={product.img} />
                    <div className={styles.productInfo}>
                        <div className={styles.productDesc}>{product.desc}</div>
                        <div className={styles.userName}>
                            -{product.byUsername}
                        </div>
                    </div>
                </div>
                <div className={styles.second}>
                    <div className={styles.maxBidDiv}>
                        Current Maximum Bid: {maxBid}
                    </div>
                    <div className={styles.secondSubDiv}>
                        <div className={styles.errorDiv}>{error}</div>
                        <div className={styles.btns}>
                            {isOwner ? (
                                <>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={deleteHandler}
                                    >
                                        Delete The Product
                                    </button>
                                    <button
                                        className={styles.sellBtn}
                                        onClick={sellHandler}
                                    >
                                        Sell The product
                                    </button>
                                </>
                            ) : (
                                <div className={styles.inputDiv}>
                                    <label
                                        htmlFor="bid"
                                        className={styles.bidLabel}
                                    >
                                        Place Your Bid:
                                    </label>
                                    <input
                                        type="number"
                                        id="bid"
                                        ref={bidref}
                                        placeholder="Bid"
                                        className={styles.bidInput}
                                    />
                                    <button
                                        className={styles.placeBtn}
                                        onClick={handleClick}
                                    >
                                        Place Bid
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bidsDiv}>
                <h4>Bids</h4>
                <ul className={styles.bidsList}>
                    {bids.map((bid, idx) => {
                        return (
                            <div key={idx} className={styles.bid}>
                                <div className={styles.bidValue}>{bid.qty}</div>
                                <div className={styles.bidBy}>
                                    By: {bid.byUsername}
                                </div>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Product;
