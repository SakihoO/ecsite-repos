/* 会員登録ページ */
// frontend/pages/member/register.tsx
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

  const onSubmit = async (data) => {
    sessionStorage.setItem('formData', JSON.stringify(data)); // フォームの値をセッションストレージに保存
    router.push(`/member/confirm`);
  };

  return (
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