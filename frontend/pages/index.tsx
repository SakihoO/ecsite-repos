import Image from "next/image";
import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layouts from "../components/Layouts";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Title from "../components/Layout/Title";
import CategorySearch from "../components/Products/CategorySearch";
import Button from "../components/Button/Button";
import Slider from "../components/Slider";
import styles from "../styles/Home.module.scss"
import utilStyles from "../styles/utils.module.scss";
import { getCatsData } from "../lib/category";

/* SSGでカテゴリーデータを持ってくる処理 */
export async function getStaticProps() {
    const allCatData = getCatsData(); //id, title, thumbnail
    // console.log(allCatData);
    return {
        props: {
            allCatData,
        },
    };
}

export default function Home({ allCatData }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ message, setMessage ] = useState('');

    /* 会員登録ボタンがクリックされたら発火する処理2件 */
    const handleMemberRegistration = () => {
        sessionStorage.removeItem("formData"); // 1,セッションストレージの値を削除
        router.push("/member/register"); // 2,会員登録ページへ遷移
    };

    /* ログイン状態をセッションストレージで管理 */
    useEffect(() => {
        const checkLoggedIn = () => {
            const isLoggedInSession = sessionStorage.getItem("isLoggedIn");
            if (isLoggedInSession === "true") {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        checkLoggedIn();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api');
            const data = await response.json();
            setMessage(data.message);
          } catch (error) {
            console.error('データの取得中にエラーが発生しました', error);
          }
        };
        fetchData();
    }, []);

    return (
        <Layouts>
            <div>
                <Header searchQuery={undefined} />

                <div className={utilStyles.body}>
                    <Slider />

                    <Title
                        contentTitle={'カテゴリから探す'}
                        subTitle={'search by category'}
                    />

                    <CategorySearch />

                    <div className={styles.ctaArea}>
                        <div className={styles.ctaLogoImg}>
                            <Image src="/bodyLogo.png" className={styles.ctaLogoImg} alt="Reposロゴ" width={300} height={300}/>
                        </div>

                        {/* ログイン成功時は新規会員登録箇所を表示しない処理 */}
                        {!isLoggedIn && (
                            <>
                                <p className={styles.ctaTxt}><strong>新規会員登録はこちら</strong></p>
                                <button onClick={handleMemberRegistration}>会員登録する</button>
                            </>
                        )}

                    </div>
                </div>
                <Footer />
            </div>
        </Layouts>
    );
}