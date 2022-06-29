import React, { useRef } from "react";
import axios from "axios";
import styles from "./css/PostProduct.module.css";
import { url } from "../BE";

const PostProduct = (props) => {
    const nameref = useRef();
    const descref = useRef();
    const imgref = useRef();
    const bidref = useRef();
    const handlePost = () => {
        console.log("_id is ", props._id);
        const URL = url + "/postproduct";
        axios.post(
            URL,
            {
                name: nameref.current.value,
                desc: descref.current.value,
                img: imgref.current.value,
                maxBid: bidref.current.value,
            },
            { withCredentials: true }
        );
        nameref.current.value =
            descref.current.value =
            imgref.current.value =
            bidref.current.value =
                "";
    };
    return (
        <div className={styles.mainDiv}>
            <div className={styles.postDiv}>
                <div className={styles.content}>
                    <div className={styles.heading}>ADD YOUR PRODUCT</div>
                    <div className={styles.nameDiv}>
                        <label
                            htmlFor="productName"
                            className={styles.nameLabel}
                        >
                            Product
                        </label>
                        <input
                            type="text"
                            name="productName"
                            id="productName"
                            placeholder="Product Name"
                            className={styles.nameInput}
                            ref={nameref}
                        />
                    </div>
                    <div className={styles.descDiv}>
                        <label
                            htmlFor="description"
                            className={styles.descLabel}
                        >
                            Description
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description"
                            maxLength={150}
                            className={styles.descTextArea}
                            ref={descref}
                        />
                    </div>
                    <div className={styles.imageDiv}>
                        <label htmlFor="imageurl" className={styles.imageLabel}>
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="imageurl"
                            id="imageurl"
                            placeholder="Image URL"
                            className={styles.imageInput}
                            ref={imgref}
                        />
                    </div>
                    <div className={styles.bidDiv}>
                        <label
                            htmlFor="bidstartingprice"
                            className={styles.bidLabel}
                        >
                            Starting Bid Price
                        </label>
                        <input
                            type="number"
                            name="bidstartingprice"
                            id="bidstartingprice"
                            placeholder="Starting Bid Price"
                            className={styles.bidInput}
                            ref={bidref}
                        />
                    </div>
                    <button className={styles.submitBtn} onClick={handlePost}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostProduct;
