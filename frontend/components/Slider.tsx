import React from "react";
import styles from "./Slider.module.scss";

const Slider = () => {
    return (
      <div className={styles.slideArea}>
        <div className={styles.slideAreaBox}>
          <div className={styles.carousel}>
            <img src="/topSlide1.png" />
            <img src="/topSlide2.png" />
            <img src="/topSlide3.png" />
            <img src="/topSlide1.png" />
          </div>
        </div>
      </div>
    );
};

export default Slider;