import React from "react";
import styles from "./Button.module.scss";

// interface ButtonProps {
//     text: string;
//     onClick: () => void;
// }

// const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
//     return (
//         <button type="button" onClick={onClick}>
//             {text}
//         </button>
//     )
// }

const Button = (props) => {
    // const handleSubmit = () => {
    //     //フォームの送信処理を実行する関数を呼び出す
    //     props.onSubmit()
    // };

    // return (
    //     <div className={styles.buttonArea}>
    //         {/* onClickプロパティでhandleSubmit関数を呼び出す */}
    //         <button type="submit" onClick={handleSubmit}>
    //             <a href={props.link}><img src={props.button} className={styles.button}/></a>
    //         </button>
    //     </div>


    // );

    return (
        // <div className={styles.container}>
        //     <button className={styles.button}>
        //         <a href={props.link}>
        //             <span>{props.text}</span>
        //         <img src={props.arrowSrc}alt="Arrow" className={styles.arrow} /></a>
        //     </button>
        // </div>
        <div className={styles.container}>
            <a href={props.link} className={styles.arrow}>{props.text}
            </a>
        </div>

    );

};

export default Button;