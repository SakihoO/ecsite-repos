/* ログインコンポーネント */
import { useState } from "react";
import styles from "./Login.module.scss";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import utilStyles from "../../styles/utils.module.scss"
import CenteredMessage from "../Layout/CenterMessage";

const Login = () => {
    const router = useRouter();
    const [id, setId] = useState('');
    const [user_name, setUser_name] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            // ユーザー認証機能を呼び出してログイン処理を行う
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, user_name, password }),
            });

            if (response.ok) {
                // ログイン成功時の処理
                setLoginMessage(true);
                // ログイン成功時にログイン状態をセッションストレージに保存する
                const data = await response.json();
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("user_id", data.id); // ユーザーIDをセッションストレージに保存

                setTimeout(() => {
                    window.location.href = '/'; // トップページに遷移する
                }, 1000); // 1秒後に遷移

            } else {
                // ログイン失敗時の処理
                setError('ログインに失敗しました。ユーザー名またはパスワードが正しくありません。')
            }
        } catch (error) {
            // エラーハンドリング
            console.error('ログイン時にエラーが発生しました:', error);
        }
    };

    const handleRegisterClick = () => {
        sessionStorage.clear();
        router.push('/member/register');
    }

    // エラーダイアログの「OK」をクリックするとエラーダイアログを削除する処理
    const handleOkButtonClick = () => {
        setError(null);
    };

    return (
        <div className={styles.body}>
            {loginMessage && (
                <CenteredMessage message="ログインに成功しました" />
            )}

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
                <div className={styles.sectionPass}>
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
                <Button
                    onClick={() => {}}
                    type="submit"
                    text={'ログイン'}
                />
                <div className={styles.register}>初めてご利用のお客様はこちら</div>
                <Button
                    onClick={handleRegisterClick}
                    text={'会員登録'}
                />
            </form>
            {error && (
                <div className={utilStyles.errorContainer}>
                    <div className={utilStyles.errorBox}>
                        <div className={utilStyles.errorText}>{error}</div>
                        <button className={utilStyles.okButton} onClick={handleOkButtonClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login;