/* 検索結果を表示するためのコンポーネント */

import React from "react";
import ResultCount from "./ResultCount";
import SearchProducts from "../../components/Products/SearchProducts";
import utilStyles from "../../styles/utils.module.scss";
import Layouts from "../Layouts";

// 各カラムのデータ型を指定
interface results {
    id: number;
    product_name: string;
    price: number;
    img_full_path: string;
}

interface SearchResultListProps {
    results: results[];
    searchQuery: string;
}

export default function SearchResultList({ results, searchQuery }: SearchResultListProps) {
    return (
        <Layouts>
            <ResultCount
                searchQuery={searchQuery}
                resultNumber={results.length.toString()}
            />
            <div className={utilStyles.boxParent}>
                {results.map((result) => (
                <SearchProducts
                    key={result.id}
                    prdDetailLink={`/product/${result.id}`}
                    prdImage={result.img_full_path}
                    prdName={result.product_name}
                    prdPrice={result.price}
                />
                ))}
            </div>
        </Layouts>
    );
}