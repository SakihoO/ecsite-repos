// import Head from "next/head";
import styles from "./Title.module.scss";
// import utilStyles from "../styles/utils.module.scss";


const Title = (props) => {
    return (
        <div className={styles.titleBox}>
            <h3 className={styles.contentTitle}>{props.contentTitle}<br/><span className={styles.subTitle}>{props.subTitle}</span></h3>
        </div>
    );
};

export default Title;