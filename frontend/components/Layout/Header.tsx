import Link from "next/link";
import styles from './Header.module.scss';
import SearchForm from "../Products/SearchForm";
import SearchResultList from "../Products/SearchResultList";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = ({ searchQuery }) => {
    const [searchResults, setSearchResults] = useState(null);  // 検索結果の状態を管理する
    const [showSearchResult] = useState(false);  // 検索結果リストを表示するかどうかを制御する
    const router = useRouter();

    const handleSearch = async (searchTerm) => {
        try {
            // バックエンドのエンドポイントURLを構築
            const apiUrl = `http://localhost:3000/api/products/search?search=${searchTerm}`;
            // GETリクエストを送信して検索結果を取得
            const response = await fetch(apiUrl);
            const data = await response.json();

            // 検索結果が1件以上の場合、
            if(data.length > 0) {
                // 取得した検索結果を状態に設定
                setSearchResults(data);
                // searchResult.tsxページに遷移
                router.push(`/product/searchResult?query=${searchTerm}`);
            } else {
                // 検索結果が0件の場合
                alert("該当する商品はありませんでした。キーワードを変えて検索してください。");
            }
        } catch (error) {
            console.error('検索中にエラーが出ました：', error);
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Link href="/">
                    <img src="/logo.png" />
                </Link>
            </div>

            <div className={styles.right}>

                {/* SearchFormコンポーネントにonSearch関数を渡す */}
                <SearchForm onSearch={handleSearch} />

                {/* 検索結果がある場合は、SearchResultListコンポーネントを表示する */}
                {showSearchResult && searchResults &&
                    <SearchResultList results={searchResults} searchQuery={searchQuery} />
                }
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