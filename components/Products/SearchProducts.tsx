import Link from "next/link";
import styles from "./SearchProducts.module.scss";

const SearchProducts = (props) => {
    return (
        <div className={styles.prdBox}>
            <Link href={props.prdDetailLink}>
                <img src={props.prdImage} className={styles.thumbnailImage} />
                <div className={styles.prdName}>{props.prdName}</div>
                <div className={styles.prdPrice}>{props.prdPrice}</div>
            </Link>
        </div>
    );
};

export default SearchProducts;