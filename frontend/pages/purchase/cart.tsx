/* カートページ */
import Header from "../../components/Layout/Header";
import Title from "../../components/Layout/Title";
import Layouts from '../../components/Layouts';
import Footer from "../../components/Layout/Footer";
import Cart from "../../components/Purchase/Cart";
import utilStyles from "../../styles/utils.module.scss";

export default function() {

    return (
        <Layouts>
            <Header searchQuery={undefined} />
            <div className={utilStyles.body}>
                <Title
                    contentTitle={'ショッピングカート'}
                    subTitle={'Shopping Cart'}
                />
                <Cart />
            </div>
            <Footer />
        </Layouts>
    )
}