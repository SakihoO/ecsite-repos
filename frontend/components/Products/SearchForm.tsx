/* 検索フォーム用のコンポーネント */

import { useState } from "react";
import styles from "./SearchForm.module.scss";

export default function SearchForm({ onSearch }) {
    // searchTermという状態変数を定義している。検索フォームに入力された検索語句を保持し、初期値は空文字列。
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault(); //デフォルトのフォーム送信をキャンセル

        // 日本語のみが含まれているかバリデーションチェック
        const isJapanese = /^[ぁ-んァ-ヶー一-龠]+$/.test(searchTerm);

        if(!isJapanese) {
            alert('日本語（ひらがな、カタカナ、漢字）で入力してください。');
            return;
        }

        // 親コンポーネントで定義された検索関数を呼び出す
        onSearch(searchTerm);
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
        </div>
    );
}