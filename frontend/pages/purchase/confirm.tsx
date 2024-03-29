/* 購入手続き画面 */
import Header from "../../components/Layout/Header";
import Layouts from '../../components/Layouts';
import Footer from "../../components/Layout/Footer";
import utilStyles from "../../styles/utils.module.scss";
import Confirm from "../../components/Purchase/Confirm";

export default function() {

    return (
        <Layouts>
            <Header searchQuery={undefined} />
            <div className={utilStyles.body}>
                <Confirm />
            </div>
            <Footer />
        </Layouts>
    )
}