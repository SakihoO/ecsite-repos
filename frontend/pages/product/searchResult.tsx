/* 商品検索結果ページ */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";

import Layouts from "../../components/Layouts";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import utilStyles from "../../styles/utils.module.scss";
import SearchResultList from "../../components/Products/SearchResultList";

export default function SearchResults() {
    const router = useRouter();
    const { query } = router.query; // クエリを取得

    const [searchResults,setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        // クエリが存在する場合にのみ検索結果を取得する
        if (query) {
            if (Array.isArray(query)) {
                setSearchQuery(query[0]); // queryが配列の場合、最初の要素を取得
            } else {
                setSearchQuery(query); // queryが配列でない場合、そのまま設定
            }
            const fetchSearchResults = async () => {
                try {
                    // APIエンドポイントのURLを構築し、検索クエリを含める
                    const apiUrl = `/api/products/search?search=${query}`;

                    // APIエンドポイントにGETリクエストを送信し、検索結果を取得する
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    // 取得した検索結果を状態に設定する
                    setSearchResults(data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };

            // ページがロードされる時に検索結果を取得する
            fetchSearchResults();
        }
    }, [query]);

    return (
        <Layouts>
            <Header searchQuery={searchQuery} />
            <div className={utilStyles.body}>

                {/* 検索結果がある場合は、SearchResultListコンポーネントを表示する */}
                {searchResults.length > 0 && <SearchResultList results={searchResults} searchQuery={searchQuery}/>}
            </div>
            <Footer />
        </Layouts>
    );
}