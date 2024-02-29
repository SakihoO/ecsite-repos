/* 会員登録ページ */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import RegisterForm from '../../components/Form/RegisterForm';
import Layouts from '../../components/Layouts';
import Header from '../../components/Layout/Header';
import Title from '../../components/Layout/Title';
import Footer from '../../components/Layout/Footer';
import utilStyles from "../../styles/utils.module.scss"

export default function Page() {
  const router = useRouter();
  const methods = useForm();

  /* 初回のレンダリング時にセッションストレージの値を削除する処理（トップページから遷移してきた場合などは空にしておく） */
  useEffect(() => {
    sessionStorage.removeItem("formData"); // セッションストレージの値を削除
  }, []);

  /* 次へボタンをクリックすると確認画面にフォームの値を渡す処理 */
  const onSubmit = async (data) => {
    sessionStorage.setItem('formData', JSON.stringify(data)); // フォームの値をセッションストレージに保存
    router.push(`/member/confirm`);
  };

  return (
    // フォームの状態、メソッドを提供する
    <FormProvider {...methods}>
      <Layouts>
        <Header searchQuery={undefined} />
        <div className={utilStyles.body}>
          <Title
              contentTitle={'新規会員登録'}
              subTitle={'Membership'}
          />
          <div className={utilStyles.inner}>
              <div className="register-page">
                  <RegisterForm onSubmit={onSubmit} />
              </div>
          </div>
        </div>
        <Footer />
      </Layouts>
    </FormProvider>
  );
}