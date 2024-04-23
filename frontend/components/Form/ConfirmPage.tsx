/* 確認画面コンポーネント */
import { useEffect, useState } from 'react';
import styles from "./ConfirmPage.module.scss";
import { useRouter } from 'next/router';
import Button from '../Button/Button';

interface ConfirmPageProps {
  formData: {
    family_name: string;
    first_name: string;
    post_code: number;
    prefecture: string;
    municipalities: string;
    street_address: string;
    apartment: string;
    user_name: string;
    password: string;
  };
  handleRegister: () => void;
  handleGoBack: () => void;
}

const ConfirmPage: React.FC<ConfirmPageProps> = ({ formData, handleRegister, handleGoBack }) => {
  const router = useRouter();
  const [storedFormData, setStoredFormData] = useState<FormData | null>(null);

  /* 登録フォームに入力した値を確認画面にセットする処理 */
  useEffect(() => {
    // ここでセッションストレージから値を取得し、stateにセットする。
    const storedFormDataString = sessionStorage.getItem('formData');
    if (storedFormDataString) {
      const storedData = JSON.parse(storedFormDataString);
      setStoredFormData(storedData);
    }
  }, []);

    // 送信ボタンがクリックされたときの処理
    const handleRegisterClick = () => {
      // ユーザー名をセッションストレージに保存
      sessionStorage.setItem('user_name', formData.user_name);

      // handleRegisterを実行して登録処理を行う
      handleRegister();
    };

  return (
    <div className={styles.inner}>
      <div className={styles.section}>
        <div className={styles.title}>姓</div>
        <div className={styles.value}>{formData.family_name}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>名</div>
        <div className={styles.value}>{formData.first_name}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>郵便番号</div>
        <div className={styles.value}>{formData.post_code}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>都道府県</div>
        <div className={styles.value}>{formData.prefecture}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>市区町村</div>
        <div className={styles.value}>{formData.municipalities}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>番地</div>
        <div className={styles.value}>{formData.street_address}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>建物</div>
        <div className={styles.value}>{formData.apartment}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>メールアドレス</div>
        <div className={styles.value}>{formData.user_name}</div>
      </div>
      <Button
        onClick={handleRegisterClick}
        text={'この内容で送信する'}
      />
      <Button
        onClick={handleGoBack}
        text={'戻る'}
        variant={'back'}
      />
    </div>
  );
};

export default ConfirmPage;