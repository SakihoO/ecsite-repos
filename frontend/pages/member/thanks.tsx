/* 完了画面ページ */
import ThanksPage from '../../components/Form/ThanksPage';
import Layouts from '../../components/Layouts';
import Header from '../../components/Layout/Header';
import utilStyles from "../../styles/utils.module.scss"
import Footer from '../../components/Layout/Footer';
import { useEffect } from 'react';

export default function Page() {

    /* 会員登録が完了したら（＝完了画面に遷移したら）セッションストレージの値を削除する処理 */
    useEffect(() => {
        sessionStorage.removeItem('formData');
    }, []);

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