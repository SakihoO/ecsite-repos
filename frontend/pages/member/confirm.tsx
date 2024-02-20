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
      // sessionStorage.removeItem('formData'); // 取得した後はセッションストレージから削除
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
      if (response.ok) { // レスポンスのステータスコードが成功を示すものかどうか
        console.log('User registered successfully!');
        router.push('/member/thanks'); // ユーザーが正常に登録された場合のリダイレクト先
      } else { // ユーザーの登録に失敗した場合
        console.error('Failed to register user.');
        alert("このメールアドレスは既に使用されています");
      }
    } catch (error) { // 非同期処理中にエラーが発生した場合に実行される
      console.error('Error registering user:', error);
      alert("申し訳ありませんが、ユーザーの登録中にエラーが発生しました。後でもう一度お試しください。");
    }
  };

  const handleGoBack = () => {
    // ブラウザの戻るボタンをクリックした際の挙動
    router.back();
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
            <ConfirmPage formData={formData} handleRegister={handleRegister} handleGoBack={handleGoBack} />
          </div>
      </div>
      <Footer />
    </Layouts>
  );
};