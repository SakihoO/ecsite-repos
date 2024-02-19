// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
// import styles from "./RegisterForm.module.scss"
// import Button from "../Button/Button";
// import { useFormData } from "../../context/FormDataContext";
// import { japaneseCharactersRegex, postalCodeRegex, emailRegex, passwordRegex } from '../../utils/validations';
// import { prefectures } from "../../utils/constants";
// import ConfirmPage from "./ConfirmPage";

// type FormData = {
//     family_name: string;
//     first_name: string;
//     post_code: string;
//     prefecture: string;
//     municipalities: string;
//     apartment: string;
//     user_name: string;
//     emailConfirmation: string;
//     password: string;
//     passwordConfirmation: string;
//     street_address: string;
// };

// const RegisterForm = (props) => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const router = useRouter();
//     // const { formData, setFormData } = useFormData(); // FormDataContext からデータとセッターを取得
//     const { formData } = useFormData();
//     console.log("RegisterForm - FormData:", formData);

//     const [showConfirmPage, setShowConfirmPage] = useState(false); // 確認ページを表示するかどうかの状態を管理

//     // console.log("FormData:", formData);

//     const onSubmit = (data) => {
//         // console.log("RegisterForm - FormData:", data); // フォームデータの値をコンソールログに出力
        
//         // 各項目のバリデーションを実行
//         if (!data.family_name || !japaneseCharactersRegex.test(data.family_name)) {
//             alert('「姓」を日本語で入力してください');
//             return;
//         }
//         if (!data.first_name || !japaneseCharactersRegex.test(data.first_name)) {
//             alert('「名」を日本語で入力してください');
//             return;
//         }
//         if (!data.post_code || !postalCodeRegex.test(data.post_code)) {
//             alert('郵便番号が正しくありません');
//             return;
//         }
//         if (!data.user_name || !emailRegex.test(data.user_name)) {
//             alert('メールアドレスが正しくありません');
//             return;
//         }
//         if (data.user_name !== data.emailConfirmation) {
//             alert('メールアドレスが一致しません');
//             return;
//         }
//         if (!data.password || !passwordRegex.test(data.password)) {
//             alert('パスワードが正しくありません');
//             return;
//         }
//         if (data.password !== data.passwordConfirmation) {
//             alert('パスワードが一致しません');
//             return;
//         }

//         // フォームデータをコンテキストに保存
//         // setFormData(data);

//         // バリデーションが成功した場合、入力内容を確認ページに渡して遷移する
//         router.push('/member/confirm');

//         // 確認ページを表示する
//         // setShowConfirmPage(true);
//     };

//     // console.log("FormData:", formData);


//     return (
//         <div>
//                         <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//                         <div className={styles.section}>
//                             <div className={styles.title}><label>姓</label><span className={styles.required}>必須</span></div>
//                             <div className={styles.box}>
//                                 <input {...register('family_name', { required: true })} placeholder="例）山田" />
//                             </div>
//                         </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>名</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('first_name', { required: true })} placeholder="例）太郎" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>郵便番号</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('post_code', { required: true })} placeholder="111111（ハイフンの入力は不要です）" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>都道府県</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <select {...register('prefecture', { required: true })}>
                        //             {prefectures.map((prefecture) => (
                        //                 <option key={prefecture.value} value={prefecture.value}>
                        //                     {prefecture.label}
                        //                 </option>
                        //             ))}
                        //         </select>
                        //         {errors.prefecture && <span>都道府県を入力してください</span>}
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>市区町村</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('municipalities', { required: true })} placeholder="例）港区六本木" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>番地</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('street_address', { required: true })} placeholder="例）1-9-9" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>建物</label></div>
                        //     <div className={styles.box}>
                        //         <input {...register('apartment', { required: false })} />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>メールアドレス</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('user_name', { required: true })} placeholder="例）abcde@reposec.com" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>メールアドレス（確認）</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('emailConfirmation', { required: true })} placeholder="例）abcde@reposec.com" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>パスワード</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('password', { required: true })} placeholder="英数字8文字以上" />
                        //     </div>
                        // </div>
                        // <div className={styles.section}>
                        //     <div className={styles.title}><label>パスワード（確認）</label><span className={styles.required}>必須</span></div>
                        //     <div className={styles.box}>
                        //         <input {...register('passwordConfirmation', { required: true })} placeholder="英数字8文字以上" />
                        //     </div>
                        // </div>
            
//                         <button type="submit">次へ
//                             {/* <Button
//                                 // link={'/member/kakunin'}
//                                 text={'次へ'}
//                                 onClick={() => {}}
//                             /> */}
//                         </button>
            
//                         {/* {errorMessage && <div>{errorMessage}</div>} */}
            
//                     </form>


//         </div>

//     );
// };

// export default RegisterForm;


/* 会員登録フォームコンポーネント */

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { prefectures } from "../../utils/constants";
import ErrorMessages from './ErrorMessage';
import styles from "./RegisterForm.module.scss";

const RegisterForm = ({ onSubmit }) => {
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // メールアドレス確認（user_name_confirmation）がメールアドレスと一致しているかを確認する
    const handleUserNameConfirmChange = (e) => {
        const { value } = e.target;
        const originalValue = e.target.form.user_name.value;
        setUserNameError(value !== originalValue || value === '' || originalValue === '');
    };

    // パスワード確認（password_confirmation）がパスワードと一致しているかを確認する
    const handlePasswordConfirmChange = (e) => {
        const { value } = e.target;
        const originalValue = e.target.form.password.value;
        setPasswordError(value !== originalValue || value === '' || originalValue === '');
    };

    // 各項目のエラーが出ている場合は、フォームの送信を中止する。それ以外の場合はフォームのデータを送信する。
    const onSubmitForm = (data) => {
        if (userNameError || passwordError || errors.user_name || errors.user_name_confirmation || errors.password || errors.password_confirmation) return;
        onSubmit(data);
    };

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit(onSubmitForm)} action='/frontend/pages/api/register.js' method='POST'>

                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="family_name">姓</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="family_name" {...register('family_name', {
                            required: true,
                            pattern: { value: /^[ぁ-んァ-ン一-龥]+$/ }
                        })} placeholder="例）山田" />
                        {errors.family_name && errors.family_name.type === "pattern" && (
                            <div className={styles.error}>日本語で入力してください。</div>
                        )}
                        {errors.family_name && errors.family_name.type !== "pattern" && (
                            <div className={styles.error}>姓を入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="first_name">名</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="first_name" {...register('first_name', {
                            required: true,
                            pattern: { value: /^[ぁ-んァ-ン一-龥]+$/ }
                        })} placeholder="例）太郎" />
                        {errors.first_name && errors.first_name.type === "pattern" && (
                            <div className={styles.error}>日本語で入力してください。</div>
                        )}
                        {errors.first_name && errors.first_name.type !== "pattern" && (
                            <div className={styles.error}>名を入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="post_code">郵便番号</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="post_code" {...register('post_code', {
                            required: true,
                            pattern: { value: /^\d{7}$/ }
                        })} placeholder="111111（ハイフンの入力は不要です）" />
                        {errors.post_code && errors.post_code.type === "pattern" && (
                            <div className={styles.error}>郵便番号が正しくありません。</div>
                        )}
                        {errors.post_code && errors.post_code.type !== "pattern" && (
                            <div className={styles.error}>郵便番号を入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="prefecture">都道府県</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <select id="prefecture" {...register('prefecture', { required: true })}>
                            {prefectures.map((prefecture) => (
                                <option key={prefecture.value} value={prefecture.value}>
                                    {prefecture.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="municipalities">市区町村</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="municipalities" {...register('municipalities', {
                            required: true,
                            pattern: { value: /^[ぁ-んァ-ン一-龥]+$/ }
                        })} placeholder="例）港区六本木" />
                        {errors.municipalities && errors.municipalities.type === "pattern" && (
                            <div className={styles.error}>日本語で入力してください。</div>
                        )}
                        {errors.municipalities && errors.municipalities.type !== "pattern" && (
                            <div className={styles.error}>市区町村を入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="street_address">番地</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="street_address" {...register('street_address', {
                            required: true
                        })} placeholder="例）1-9-9" />
                        {errors.street_address && (
                            <div className={styles.error}>番地を入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="apartment">建物名</label><span className={styles.option}></span></div>
                    <div className={styles.box}>
                        <input id="apartment" {...register('apartment')} />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="user_name">メールアドレス</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="user_name" {...register('user_name', {
                            required: true,
                            pattern: { value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/ }
                        })} placeholder="例）abcde@reposec.com" />
                        {errors.user_name && errors.user_name.type === "pattern" && (
                            <div className={styles.error}>メールアドレスが正しくありません。</div>
                        )}
                        {errors.user_name && errors.user_name.type !== "pattern" && (
                            <div className={styles.error}>メールアドレスを入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="user_name_confirmation">メールアドレス（確認）</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="user_name_confirmation" {...register('user_name_confirmation', {
                            required: true
                        })}
                        placeholder="例）abcde@reposec.com"
                        onChange={handleUserNameConfirmChange} />
                        {userNameError && (
                            <div className={styles.error}>メールアドレスが一致しません。</div>
                        )}
                        {errors.user_name_confirmation && errors.user_name_confirmation.type === "required" && (
                            <div className={styles.error}>メールアドレス（確認）を入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="password">パスワード</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="password" type='password' {...register('password', {
                            required: true,
                            pattern: { value: /^[a-z\d]{8,100}$/i }
                        })} placeholder="半角英数字8文字以上" />
                        {errors.password && errors.password.type === "pattern" && (
                            <div className={styles.error}>パスワードが正しくありません。</div>
                        )}
                        {errors.password && errors.password.type !== "pattern" && (
                            <div className={styles.error}>パスワードを入力してください。</div>
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="password_confirmation">パスワード（確認）</label><span className={styles.required}>必須</span></div>
                    <div className={styles.box}>
                        <input id="password_confirmation" type='password' {...register('password_confirmation', {
                            required: true
                        })}
                        placeholder="英数字8文字以上"
                        onChange={handlePasswordConfirmChange} />
                        {passwordError && (
                            <div className={styles.error}>パスワードが一致しません。</div>
                        )}
                        {errors.password_confirmation && errors.password_confirmation.type === "required" && (
                            <div className={styles.error}>パスワード（確認）を入力してください。</div>
                        )}
                    </div>
                </div>

                <button type="submit">次へ</button>
            </form>
        </div>
    );
};

export default RegisterForm;