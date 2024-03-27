/* 確認画面ページ */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ConfirmPage from '../../components/Form/ConfirmPage';
import Layouts from '../../components/Layouts';
import Header from '../../components/Layout/Header';
import Title from '../../components/Layout/Title';
import Footer from '../../components/Layout/Footer';
import utilStyles from "../../styles/utils.module.scss"

export default function Page() {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  /* 登録フォームで入力した値をセッションストレージから取得する処理 */
  useEffect(() => {
    const storedData = sessionStorage.getItem('formData');
    // console.log('storedDataの値：', storedData); // storedData の値をログ出力
    if (storedData) {
      setFormData(JSON.parse(storedData)); // セッションストレージからフォームの値を取得
    }
  }, []);

  if (!formData) {
    return null; // フォームの値が取得できるまで何も表示しない
  }

  /* 会員登録ボタンをクリックすると値formDataをAPIでDBに渡す処理 */
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
        console.log('ユーザー登録が成功しました。');
        router.push('/member/thanks'); // ユーザーが正常に登録された場合のリダイレクト先
      } else { // ユーザーの登録に失敗した場合
        console.error('ユーザー登録が失敗しました。');
        alert("このメールアドレスは既に使用されています");
      }
    } catch (error) { // 非同期処理中にエラーが発生した場合に実行されるエラーハンドリング
      console.error('Error registering user:', error);
      alert("申し訳ありませんが、ユーザー登録中にエラーが発生しました。後でもう一度お試しください。");
    }
  };

  /* 戻るボタンをクリックした際の挙動 */
  const handleGoBack = () => {
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