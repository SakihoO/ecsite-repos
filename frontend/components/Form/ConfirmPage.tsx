// import React from "react";
// import { useRouter } from "next/router";
// import { useFormData } from "../../context/FormDataContext";
// import OtherComponent from "./OtherComponent";
// import styles from "./ConfirmPage.module.scss";

// const ConfirmPage = () => {
//     const { formData } = useFormData();
//     console.log("ConfirmPage - FormData:", formData); // フォームデータの値をコンソールログに出力
//     const router = useRouter();

//     const handleSubmit = () => {
//         // フォームデータをDBに保管する処理を実行
//         // 例: fetch("/api/submitForm", { method: "POST", body: JSON.stringify(formData) });

//         // 送信完了ページに遷移
//         router.push("/submit-success");
//     }

//     // 前のページに戻る
//     const handleGoBack = () => {
//         console.log("Navigating back");
//         // router.push('/member/register');
//         router.back();
//     }

//     return (
//         <div className={styles.inner}>
//             <OtherComponent />
//                 <div className={styles.section}>
//                     <div className={styles.title}>姓</div>
//                     <div className={styles.value}>{formData?.family_name}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>名</div>
//                     <div className={styles.value}>{formData?.first_name}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>郵便番号</div>
//                     <div className={styles.value}>{formData?.post_code}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>都道府県</div>
//                     <div className={styles.value}>{formData?.prefecture}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>市区町村</div>
//                     <div className={styles.value}>{formData?.municipalities}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>番地</div>
//                     <div className={styles.value}>{formData?.street_address}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>建物</div>
//                     <div className={styles.value}>{formData?.apartment}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>メールアドレス</div>
//                     <div className={styles.value}>{formData?.user_name}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>メールアドレス（確認）</div>
//                     <div className={styles.value}>{formData?.emailConfirmation}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>パスワード</div>
//                     <div className={styles.value}>{formData?.password}</div>
//                 </div>
//                 <div className={styles.section}>
//                     <div className={styles.title}>パスワード（確認）</div>
//                     <div className={styles.value}>{formData?.passwordConfirmation}</div>
//                 </div>

//                 <button onClick={handleSubmit}>この内容で登録する</button>
//                 <button onClick={handleGoBack}>戻る</button>
//         </div>
//     );
// };

// export default ConfirmPage;

/* 確認画面コンポーネント */

import { useEffect } from 'react';
import { prefectures } from "../../utils/constants";
import styles from "./ConfirmPage.module.scss";

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
    user_name_confirmation: string;
    password: string;
    password_confirmation: string;
  };
  handleRegister: () => void;
}

const ConfirmPage: React.FC<ConfirmPageProps> = ({ formData, handleRegister }) => {
  useEffect(() => {
    // ここに何かしらの副作用を書く場合
  }, []);

  // 都道府県の値をlabelに変換する関数
  const getPrefectureLabel = (value: string) => {
    const prefecture = prefectures.find(pref => pref.value === value);
    return prefecture ? prefecture.label : '';
  }

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
                    <div className={styles.value}>{getPrefectureLabel(formData.prefecture)}</div>
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
                <div className={styles.section}>
                    <div className={styles.title}>メールアドレス（確認）</div>
                    <div className={styles.value}>{formData.user_name_confirmation}</div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>パスワード</div>
                    <div className={styles.value}>{formData.password}</div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}>パスワード（確認）</div>
                    <div className={styles.value}>{formData.password_confirmation}</div>
                </div>

                {/* <button onClick={handleSubmit}>この内容で登録する</button>
                <button onClick={handleGoBack}>戻る</button> */}
                <button onClick={handleRegister} className={styles.registerButton}>会員登録する</button>

        </div>
  );
};

export default ConfirmPage;