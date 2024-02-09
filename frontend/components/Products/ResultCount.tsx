/* 商品検索/カテゴリーから探すの検索結果件数表示用コンポーネント */

import styles from "./ResultCount.module.scss";

const ResultCount = (props) => {
    // searchQueryが存在する場合（商品検索フォームから検索した場合）
    if(props.searchQuery){
        return(
            <div className={styles.body}>
                <p>{props.searchQuery} の検索結果<span>{props.resultNumber}</span>件</p>
            </div>
        );
    } else {
        // searchQueryが存在しない場合（カテゴリーから探すから検索した場合）
        return (
            <div className={styles.body}>
                <p>検索結果<span>{props.resultNumber}</span>件</p>
            </div>
        );
    }
};

export default ResultCount;