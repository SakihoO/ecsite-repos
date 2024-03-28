import React from "react";
import styles from "./SubTitle.module.scss";

const Title = (props) => {
    return (
        <div className={styles.titleBox}>
            <img src="/icon/iconCheck.png"></img>
            <h3 className={styles.contentTitle}>{props.contentTitle}</h3>
        </div>
    );
};

export default Title;