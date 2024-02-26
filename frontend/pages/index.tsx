import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/router";

//SSGでカテゴリーデータを持ってくる
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
    const [ message, setMessage ] = useState('');
    const router = useRouter();

    // 会員登録ページへの遷移時にセッションストレージの値を削除
    const handleMemberRegistration = () => {
        sessionStorage.removeItem("formData"); // セッションストレージの値を削除
        router.push("/member/register"); // 会員登録ページへ遷移
    };

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
                        <p className={styles.ctaTxt}><strong>新規会員登録はこちら</strong></p>
                        {/* <Button
                            link={'/member/register'}
                            text={'会員登録する'}
                            onClick={handleMemberRegistration}
                        /> */}
                        <button onClick={handleMemberRegistration}>会員登録する</button>

                    </div>
                </div>
                <Footer />
            </div>
        </Layouts>
        
    );
}