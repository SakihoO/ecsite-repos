/* 完了画面コンポーネント */
import Button from '../Button/Button';
import styles from './ThanksPage.module.scss';

export default function ThanksPage() {
    return (
        <div className={styles.inner}>
            <div className={styles.text}>登録が完了しました。</div>
            <Button
                link={'/'}
                text={'お買い物を続ける'}
            />
        </div>
    );
}