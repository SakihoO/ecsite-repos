import Link from "next/link";
import styles from "./Header.module.scss";
import utilStyles from "../../styles/utils.module.scss"
import SearchForm from "../Products/SearchForm";
import SearchResultList from "../Products/SearchResultList";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import CenteredMessage from "./CenterMessage";

const Header = ({ searchQuery }) => {
    const [searchResults, setSearchResults] = useState(null);  // 検索結果の状態を管理する
    const [showSearchResult] = useState(false);  // 検索結果リストを表示するかどうかを制御する
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理する
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [logoutMessage, setLogoutMessage] = useState(false);

    /* ログイン状態をセッションストレージで管理する */
    useEffect(() => {
        // コンポーネントがマウントされた時に実行されるロジック
        const checkLoggedIn = () => {
            const isLoggedInSession = sessionStorage.getItem("isLoggedIn");
            if (isLoggedInSession === "true") {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        checkLoggedIn(); // マウント時にログイン状態をチェックする
    }, []);

    /* ログアウトアイコンをクリックした際の処理 */
    const handleLogout = async () => {
        try {
            // セッションストレージから全てを削除
            sessionStorage.clear();
            // ログアウト後はログイン状態を更新し、ログインアイコンに切り替える
            setIsLoggedIn(false);

            // ログアウトメッセージを表示する
            setLogoutMessage(true);
            // ログアウト成功メッセージを非表示にするためのタイマーセット
            setTimeout(() => {
                setLogoutMessage(false);
                window.location.href = '/'; // トップページに遷移する
            }, 800);

        } catch (error) {
            console.error('ログアウト時にエラーが発生しました:', error);
        }
    }

    const handleSearch = async (searchTerm) => {
        try {
            // バックエンドのエンドポイントURLを構築
            const apiUrl = `/api/products/search?search=${searchTerm}`;
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
                setError("該当する商品はありませんでした。キーワードを変えて検索してください。");
            }
        } catch (error) {
            console.error('検索中にエラーが出ました：', error);
        }
    };

        // エラーダイアログの「OK」をクリックするとエラーダイアログを削除する処理
        const handleOkButtonClick = () => {
            setError(null);
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

                {error && (
                    <div className={utilStyles.errorContainer}>
                        <div className={utilStyles.errorBox}>
                            <div className={utilStyles.errorText}>{error}</div>
                            <button className={utilStyles.okButton} onClick={handleOkButtonClick}>OK</button>
                        </div>
                    </div>
                )}

                {/* 条件付きレンダリングでログイン状態に応じて、ログインアイコンを切り替える */}
                {isLoggedIn ? (
                    <div className={styles.iconLogin}>
                        <button onClick={handleLogout} className={styles.button}>
                            <div className={styles.iconTxt}>ログアウト</div>
                            <img src="/icon/iconLogout.png" />
                        </button>
                    </div>
                ) : (
                    <div className={styles.iconLogin}>
                        <Link href="/member/login">
                            <div className={styles.iconTxt}>ログイン</div>
                            <img src="/icon/iconLogin.png" />
                        </Link>
                    </div>
                )}

                {logoutMessage && (
                    <CenteredMessage message="ログアウトしました" />
                )}

                {/* 条件付きレンダリングでログイン状態に応じて、カートアイコンの表示/非表示を切り替える */}
                {isLoggedIn ? (
                    <div className={styles.iconCart}>
                        <Link href="/purchase/cart">
                            <div className={styles.iconTxt}>カート</div>
                            <img src="/icon/iconCart.png" />
                        </Link>
                    </div>
                ) : null}

            </div>
        </div>
    );
};

export default Header;