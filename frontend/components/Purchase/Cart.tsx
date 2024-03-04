/* カートコンポーネント */
import { useEffect, useState } from "react";
import styles from "./Cart.module.scss"
import { useRouter } from "next/router";

// 各カラムのデータ型を指定
interface Product {
    product_name: string;
    price: number;
    quantity: number;
}

export default function Cart() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);

    /* 商品詳細ページから［商品名／価格／個数］の値をクエリで取得する処理 */
    useEffect(() => {
        const { productName, price, quantity } = router.query;
        if ( productName && price && quantity ) {
            const productToAdd: Product = {
                product_name: productName as string,
                price: parseInt(price as string),
                quantity: parseInt(quantity as string)
            };
            addToCart(productToAdd);
        }
    }, [router.query]);

    /* カート画面読み込み時にセッションストレージから商品情報と数量を取得して設定する */
    useEffect(() => {
        // セッションストレージから既存の商品情報と数量を取得する（セッションストレージからキーがcartに紐づく値を取得し、JSON形式の文字列からJSオブジェクトに変換する。cartキーが存在しない場合は空の配列を使用する。）
        const storedProducts = JSON.parse(sessionStorage.getItem("cart") || "[]");
        setProducts(storedProducts);
    }, []);

    /* 商品をカートに追加する処理 */
    const addToCart = (product: Product) => {
        // セッションストレージから既存の商品情報と数量を取得する
        const storedProducts = JSON.parse(sessionStorage.getItem("cart") || "[]");

        // 既存の商品がカートに含まれているかを確認する（配列storedProductsの中から、引数productと同じproduct_nameを持つ商品を探す）
        const existingProductIndex = storedProducts.findIndex(
            (p: Product) => p.product_name === product.product_name
        );

        if (existingProductIndex === -1) {
            // 既存の商品が見つからなかった場合は、新しい商品を追加する
            const updatedProducts = [...storedProducts, product];
            // 更新した商品情報と個数をセッションストレージに保存する
            sessionStorage.setItem("cart", JSON.stringify(updatedProducts));
            // stateを更新して画面に反映
            setProducts(updatedProducts);
        }
    };

    /* 商品をカートから削除する処理 */
    const handleDelete = (index: number) => {
        // セッションストレージから既存の商品情報と個数を取得する
        const storedProducts = JSON.parse(sessionStorage.getItem("cart") || "[]");
        // 該当商品を削除する
        storedProducts.splice(index, 1);
        // 更新した商品情報と個数をセッションストレージに保存する
        sessionStorage.setItem("cart", JSON.stringify(storedProducts));
        // stateを更新して画面に反映
        setProducts([...storedProducts]);
    };


    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>商品名</th>
                            <th>単価</th>
                            <th>個数</th>
                            <th>小計</th>
                            <th>削除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.product_name}</td>
                                <td>{product.price}</td>
                                <td className={styles.prdQty}>
                                    {/* <input type="number" placeholder="1" min="1" max="10" /> */}
                                    {product.quantity}
                                </td>
                                <td>¥{product.price * product.quantity}</td>
                                <td><button onClick={() => handleDelete(index)}>削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.totalAmount}>商品合計（税込）<span>小計の総額</span></div>
            <button>買い物を続ける</button>
            <button>購入手続きに進む</button>
        </div>
    )
}