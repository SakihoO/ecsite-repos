/* 完了画面コンポーネント */
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './ThanksPage.module.scss';
import utilStyles from '../../styles/utils.module.scss'

export default function ThanksPage() {

  // 会員登録に成功したら、自動でログインする処理
  useEffect(() => {
    // セッションストレージから user_name を取得
    const user_name = sessionStorage.getItem('user_name');

    const fetchUserId = async () => {
      if (user_name) {
        try {
          const response = await fetch(`/api/getUserId?user_name=${user_name}`, {
            method: 'GET'
          });
          if (response.ok) {
            const data = await response.json();
            const { user_id } = data;

            // ログインに成功したらセッションストレージにuser_idとログイン状態trueを保存する。user_nameを削除する。
            sessionStorage.setItem('user_id', user_id);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.removeItem("user_name");

            // ログインに成功したら自動でトップページに遷移する
            setTimeout(() => {
              window.location.href = '/';
            }, 2000); // 2秒後に遷移

          } else {
            throw new Error('ユーザーIDの取得に失敗しました');
          }

        } catch (error) {
          console.error('ユーザーIDの取得エラー:', error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      fetchUserId();
    }
  }, []);

  const handleTopPage = () => {
    // トップページに遷移する
  };

  return (
    <div className={styles.inner}>
      <img src="/thanksPageImg.png" className={utilStyles.thanksPageImg} />
        <div className={styles.text}>登録が完了しました。</div>
        <div className={styles.autoReloadTop}>自動でトップページに遷移します。</div>
        <Button
            onClick={handleTopPage}
            link={'/'}
            text={'お買い物を続ける'}
        />
    </div>
  );
}