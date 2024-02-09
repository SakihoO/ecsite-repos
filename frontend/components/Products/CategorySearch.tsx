/* カテゴリから探すコンポーネント */

// import Head from "next/head";
import Link from "next/link";
import styles from "./CategorySearch.module.scss";
// import utilStyles from "../styles/utils.module.scss";


const CategorySearch = () => {
    return (
        <div className={styles.categoryArea}>
                <section className={styles.catBox}>
                    <Link href="/category/sofa">
                        <img src="/category/catSofa.png" className={styles.thumbnailImage} />
                        <div className={styles.catButton}>ソファ・チェア</div>
                    </Link>
                </section>
                <section className={styles.catBox}>
                    <Link href="/category/table">
                        <img src="/category/catTable.png" className={styles.thumbnailImage} />
                        <div className={styles.catButton}>テーブル</div>
                    </Link>
                </section>
                <section className={styles.catBox}>
                    <Link href="/category/lamp">
                        <img src="/category/catLamp.png" className={styles.thumbnailImage} />
                        <div className={styles.catButton}>照明</div>
                    </Link>
                </section>
                <section className={styles.catBox}>
                    <Link href="/category/goods">
                        <img src="/category/catGoods.png" className={styles.thumbnailImage} />
                        <div className={styles.catButton}>インテリア雑貨</div>
                    </Link>
                </section>
            </div>
    );
};

export default CategorySearch;