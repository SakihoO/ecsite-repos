import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    onClick: () => void;
    link?: string;
    text: string;
    variant?: "default" | "back" | "halfButton";
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, link, text, variant = "default", type = "button" }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (link) {
            window.location.href = link;
        }
    };

    // variantプロパティに基づいて異なるスタイルを適用する
    let buttonClassName = styles.buttonClassName;
    if (variant === "back") {
        buttonClassName = styles.variantBack;
    } else if (variant === "halfButton") {
        buttonClassName = styles.variantHalfButton;
    }

    return (
        <button type={type} onClick={handleClick} className={buttonClassName}>
            {text}
        </button>
    );
};

export default Button;