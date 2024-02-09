import React from "react";
import Link from "next/link";
import styles from "./SearchProducts.module.scss";

const SearchProducts = (props) => {
    // 画像パスimg_full_pathの前に、productsディレクトリを加える
    const imagePath = `/products/${props.prdImage}`;
    // 商品価格の整形
    const formatPrice = Number(props.prdPrice).toLocaleString();

    return (
        <div className={styles.prdBox}>
            <Link href={props.prdDetailLink || '/'}>
                <img src={imagePath} className={styles.thumbnailImage} />
                <div className={styles.prdName}>{props.prdName}</div>
                <div className={styles.prdPrice}>¥{formatPrice}</div>
            </Link>
        </div>
    );
};

export default SearchProducts;