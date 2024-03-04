/* カートページ */
import Header from "../../components/Layout/Header";
import Title from "../../components/Layout/Title";
import Layout from "../layout";
import Footer from "../../components/Layout/Footer";
import Cart from "../../components/Purchase/Cart";
import utilStyles from "../../styles/utils.module.scss";

export default function() {

    return (
        <Layout>
            <Header searchQuery={undefined} />
            <div className={utilStyles.body}>
                <Title
                    contentTitle={'ショッピングカート'}
                    subTitle={'Shopping Cart'}
                />
                <Cart />
            </div>
            <Footer />
        </Layout>
    )
}