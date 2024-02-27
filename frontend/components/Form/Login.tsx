import { useState } from "react";
import styles from "./Logion.module.scss";
import Button from "../Button/Button";

const Login = () => {
    const [user_name, setUser_name] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            // ユーザー認証関連の機能を呼び出してログインの処理を行う
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name, password }),
            });

            if (response.ok) {
                // ログイン成功時の処理
                console.log('ログインに成功しました。')
                setLoginMessage('ログインに成功しました。トップページに遷移します。');
                setErrorMessage(''); // ログイン成功時にはエラーメッセージを空にする
                setTimeout(() => {
                    sessionStorage.setItem("isLoggedIn", "true"); // ログイン成功をセッションストレージに保存
                    window.location.href = '/'; // トップページに遷移する
                }, 3000); // 3秒後に遷移

            } else {
                // ログイン失敗時の処理
                console.error('ログインに失敗しました。')
                setErrorMessage('ログインに失敗しました。ユーザー名またはパスワードが正しくありません。')
            }
        } catch (error) {
            // エラーハンドリング
            console.error('ログイン時にエラーが発生しました:', error);
        }
    };

    return (
        <div className={styles.body}>
            {loginMessage && <div className={styles.loginSuccess}>{loginMessage}</div>}
            {errorMessage && <div className={styles.loginFail}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="user_name">ユーザー名</label></div>
                    <div className={styles.box}>
                        <input
                            id="user_name"
                            type="email"
                            value={user_name}
                            onChange={(e) => setUser_name(e.target.value)}
                            placeholder="メールアドレスを入力してください"
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.title}><label htmlFor="password">パスワード</label></div>
                    <div className={styles.box}>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit">ログイン</button>

                <div className={styles.register}>初めてご利用のお客様はこちら</div>
                <Button
                    link={'/member/register'}
                    text={'会員登録'}
                />
            </form>

        </div>
    )
}

export default Login;