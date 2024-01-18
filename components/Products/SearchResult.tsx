import styles from "./SearchResult.module.scss";

const SearchResult = (props) => {
    return (
        <div className={styles.body}>
            <p>検索結果<span>{props.resultNumber}</span>件</p>
        </div>
    );
};

export default SearchResult;