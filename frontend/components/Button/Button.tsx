import styles from "./Button.module.scss";


const Button = (props) => {
    return (
        <div className={styles.buttonArea}>
            <a href="/"><img src={props.button} className={styles.button}/></a>
        </div>

        // <div className={styles.buttonArea}>
        //     <a className={styles.button}>会員登録<img src="/btnArrow.png" /></a>
        // </div>

        // <div className={styles.buttonBox}>
        //      <a href="#" className={`${styles.arrow_btn} ${styles["arrow_03"]}`}>会員登録する</a>
        // </div>
    );
};

export default Button;