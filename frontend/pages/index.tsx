import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layouts from "../components/Layouts";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Title from "../components/Layout/Title";
import CategorySearch from "../components/Products/CategorySearch";
import RegisterBtn from "../components/Button/Button";
import Slider from "../components/Slider";
import styles from "../styles/Home.module.scss"

import utilStyles from "../styles/utils.module.scss";
import { getCatsData } from "../lib/category";

// const apiUrl = 'http://localhost:80/api';  // バックエンドのAPIエンドポイント

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
    return (
        <Layouts>
            <div>
                <Header />

                {/* <Image src="/topSlide2.png" alt="スライド画像2" width={500} height={300}/> */}

                <div className={utilStyles.body}>
                    <Slider />

                    <Title
                        contentTitle={'カテゴリから探す'}
                        subTitle={'search by category'}
                    />
                    {/* カテゴリから探す mdファイル */}
                    {/* <div className={styles.categoryArea}>
                        {allCatData.map(({ id, titleButton, thumbnail }) => (
                            <section key={id} className={styles.catBox}>
                                <Link href={`/posts/${id}`}>
                                    <img src={`${thumbnail}`} className={styles.thumbnailImage} />
                                    <div className={styles.catButton}>{titleButton}</div>
                                </Link>
                            </section>
                        ))}
                    </div> */}

                    <CategorySearch />

                    <div className={styles.ctaArea}>
                        <div className={styles.ctaLogoImg}>
                            <Image src="/bodyLogo.png" className={styles.ctaLogoImg} alt="Reposロゴ" width={300} height={300}/>
                        </div>
                        <p className={styles.ctaTxt}><strong>新規会員登録</strong>は<strong>こちら</strong></p>
                        <RegisterBtn
                            button={'/button/registerBtn.png'}
                        />

                    </div>
                </div>
                <Footer />
            </div>
        </Layouts>
        
    );
}