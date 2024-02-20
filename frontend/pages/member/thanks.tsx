/* 確認画面ページ */

import ThanksPage from '../../components/Form/ThanksPage';
import Layouts from '../../components/Layouts';
import Header from '../../components/Layout/Header';
import utilStyles from "../../styles/utils.module.scss"
import Footer from '../../components/Layout/Footer';

export default function Page() {

    return (
        <Layouts>
        <Header searchQuery={undefined} />
        <div className={utilStyles.body}>
            <div className={utilStyles.inner}>
                <ThanksPage />
            </div>
        </div>
        <Footer />
      </Layouts>
    );
}