import Link from "next/link";
import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Link href="/">
                    <img src="/logo.png" />
                </Link>
            </div>

            <div className={styles.right}>
                <form action="#" className={styles.searchForm}>
                    <label>
                        <input type="text" placeholder="商品を検索する" />
                    </label>
                    <button type="submit" aria-label="検索"></button>
                </form>
                <div className={styles.iconLogin}>
                    <Link href="">
                        <div className={styles.iconTxt}>ログイン</div>
                        <img src="/icon/iconLogin.png" />
                    </Link>
                </div>
                <div className={styles.iconCart}>
                    <Link href="">
                        <div className={styles.iconTxt}>カート</div>
                        <img src="/icon/iconCart.png" />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Header;