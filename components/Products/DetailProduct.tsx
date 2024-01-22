import style from "./DetailProduct.module.scss";
import Link from "next/link";
import styles from "./DetailProduct.module.scss";
import sofa from "../../pages/category/sofa";
import RegisterBtn from "../Button/Button";

export default function() {
    return (
        <div className={styles.prdDetailArea}>
            <div className={styles.leftArea}>
                <img src="/products/01chair01.png" alt=""/>
            </div>
            <div className={styles.rightArea}>
                <div className={styles.prdName}>アームレスチェア ホワイト</div>
                <div className={styles.prdTxt}>ソファ・チェア</div>
                <div className={styles.prdTxt}>サイズ　幅85cm × 奥行き92cm × 高さ90cm</div>
                <div className={styles.prdSubmit}>
                    <div className={styles.prdQty}>個数<input type="number" placeholder="1" min="1" max="10"/></div>
                    <div className={styles.prdPrice}>¥ 40,000</div>
                    <RegisterBtn
                        button={'/button/cartBtn.png'}
                    />
                </div>
                    {/* <input type="submit" /> */}
            </div>
        </div>
    );
}

