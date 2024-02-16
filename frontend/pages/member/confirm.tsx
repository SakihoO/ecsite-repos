/* 確認画面ページ */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ConfirmPage from '../../components/Form/ConfirmPage';
import Layouts from '../../components/Layouts';
import Header from '../../components/Layout/Header';
import Title from '../../components/Layout/Title';
import utilStyles from "../../styles/utils.module.scss"
import Footer from '../../components/Layout/Footer';

export default function Page() {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem('formData');
    console.log('storedData:', storedData); // storedData の値をログ出力
    if (storedData) {
      setFormData(JSON.parse(storedData)); // セッションストレージからフォームの値を取得
      sessionStorage.removeItem('formData'); // 取得した後はセッションストレージから削除
    }
  }, []);

  if (!formData) {
    return null; // フォームの値が取得できるまで何も表示しない
  }

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User registered successfully!');
        router.push('/member/thanks'); // ユーザーが正常に登録された場合のリダイレクト先
      } else {
        console.error('Failed to register user.');
        // エラー処理
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // エラー処理
    }
  };

  return (
    <Layouts>
      <Header searchQuery={undefined} />
      <div className={utilStyles.body}>
          <Title
              contentTitle={'新規会員登録'}
              subTitle={'Membership'}
          />
          <div className={utilStyles.inner}>
            <ConfirmPage formData={formData} handleRegister={handleRegister} />;
          </div>
      </div>
      <Footer />
    </Layouts>
  );
};