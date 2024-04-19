/* 検索フォーム用のコンポーネント */

import { useState } from "react";
import React from "react";
import styles from "./SearchForm.module.scss";
import utilStyles from "../../styles/utils.module.scss"

export default function SearchForm({ onSearch }) {
    const [error, setError] = useState<string | null>(null);

    // searchTermという状態変数を定義している。検索フォームに入力された検索語句を保持し、初期値は空文字列。
    const [searchTerm, setSearchTerm] = useState('');

    // 日本語または半角スペースまたは数字が含まれているかのバリデーションチェック
    const isJapaneseOrSpaceOrNumber = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF 0-9]+$/;

    const handleSearch = (event) => {
        event.preventDefault(); //デフォルトのフォーム送信をキャンセル

        // 日本語のみが含まれているかバリデーションチェック
        const isValidInput = isJapaneseOrSpaceOrNumber.test(searchTerm);

        if(!isValidInput) {
            setError('日本語（ひらがな、カタカナ、漢字）、半角スペース、数字で入力してください。');
            return;
        }

        // 親コンポーネントで定義された検索関数を呼び出す
        onSearch(searchTerm);
    };

    // エラーダイアログの「OK」をクリックするとエラーダイアログを削除する処理
    const handleOkButtonClick = () => {
        setError(null);
    };

    return (
        <div>
            <form className={styles.search} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="商品を検索する"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit" aria-label="検索"></button>
            </form>
            {error && (
                <div className={utilStyles.errorBox}>
                    <p className={utilStyles.errorText}>{error}</p>
                    <button className={utilStyles.okButton} onClick={handleOkButtonClick}>OK</button>
                </div>
            )}
        </div>
    );
}