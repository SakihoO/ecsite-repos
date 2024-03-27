/* 購入完了画面 */
import Header from "../../components/Layout/Header";
import Layout from "../layout";
import Footer from "../../components/Layout/Footer";
import utilStyles from "../../styles/utils.module.scss";
import ThanksPage from "../../components/Form/ThanksPage";
import Button from "../../components/Button/Button";

export default function PurchaseThanks() {

    return (
        <Layout>
            <Header searchQuery={undefined} />
            <div className={utilStyles.body}>
                <div className={utilStyles.thanksBox}>
                    <img src="/thanksPageImg.png" className={utilStyles.thanksPageImg} />
                    <div className={utilStyles.thanksMsg}>ご注文ありがとうございました。</div>
                    <p className={utilStyles.thanksSubMsg}>注文内容がショップに送信されました。</p>
                    <Button
                        onClick={() => {}}
                        link={'/'}
                        text={'トップページへ'}
                    />
                </div>
            </div>
            <Footer />
        </Layout>
    )
}