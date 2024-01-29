import Link from "next/link";
import Layouts from "../../components/Layouts";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Title from "../../components/Layout/Title";
import DetailProduct from "../../components/Products/DetailProduct";
import utilStyles from "../../styles/utils.module.scss";

export default function() {
    return (
        <Layouts>
            <Header />
                <div className={utilStyles.body}>
                    <Title
                        contentTitle={'ソファ・チェア'}
                        subTitle={'Sofa / chair'}
                    />
                    <DetailProduct />
                </div>
            <Footer />
        </Layouts>
    );
}