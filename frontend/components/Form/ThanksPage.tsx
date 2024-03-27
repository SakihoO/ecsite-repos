/* 完了画面コンポーネント */
import Button from '../Button/Button';
import styles from './ThanksPage.module.scss';

export default function ThanksPage() {
    const handleTopPage = () => {
        // トップページに遷移する
    };
    return (
        <div className={styles.inner}>
            <div className={styles.text}>登録が完了しました。</div>
            <Button
                onClick={handleTopPage}
                link={'/'}
                text={'お買い物を続ける'}
            />
        </div>
    );
}