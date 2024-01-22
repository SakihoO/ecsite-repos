import Link from "next/link";
import Layouts from "../../components/Layouts";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Title from "../../components/Layout/Title";
import SearchResult from "../../components/Products/SearchResult";
import utilStyles from "../../styles/utils.module.scss";
import SearchProducts from "../../components/Products/SearchProducts";


export default function sofa() {
    return (
        <Layouts>
            <Header />
                <div className={utilStyles.body}>
                    <Title
                        contentTitle={'ソファ・チェア'}
                        subTitle={'Sofa / chair'}
                    />
                    <SearchResult
                        resultNumber={'6'}
                    />
                    <div className={utilStyles.boxparent}>
                        <SearchProducts
                            prdDetailLink={'/detail/detailPrd'}
                            prdImage={'/products/01chair01.png'}
                            prdName={'アームレスチェア ホワイト'}
                            prdPrice={'¥ 40,000'}
                        />
                        <SearchProducts
                            prdDetailLink={'/'}
                            prdImage={'/products/01chair02.png'}
                            prdName={'ベルベッド アームチェア ブルー'}
                            prdPrice={'¥ 45,000'}
                        />
                        <SearchProducts
                            prdDetailLink={'/'}
                            prdImage={'/products/01chair03.png'}
                            prdName={'ウィングチェア グレー オットマン付'}
                            prdPrice={'¥ 50,000'}
                        />
                        <SearchProducts
                            prdDetailLink={'/'}
                            prdImage={'/products/01chair04.png'}
                            prdName={'ベルベッド アームチェア ブラウン'}
                            prdPrice={'¥ 80,000'}
                        />
                        <SearchProducts
                            prdDetailLink={'/'}
                            prdImage={'/products/01sofa01.png'}
                            prdName={'布張りソファ 2人掛け ブラック'}
                            prdPrice={'¥ 60,000'}
                        />
                        <SearchProducts
                            prdDetailLink={'/'}
                            prdImage={'/products/01sofa02.png'}
                            prdName={'布張りソファ 3人掛け ホワイト'}
                            prdPrice={'¥ 90,000'}
                        />
                    </div>
                </div>
            <Footer />
        </Layouts>
    );
}