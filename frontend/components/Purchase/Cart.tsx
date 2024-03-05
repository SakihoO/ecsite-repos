/* カートコンポーネント */
import { useEffect, useState } from "react";
import styles from "./Cart.module.scss"
import { useRouter } from "next/router";
import session from "next-session";

// 各カラムのデータ型を指定
interface Product {
    product_name: string;
    price: number;
    quantity: number;
    img_full_path: string;
}

export default function Cart() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);

    /* 商品詳細ページから［商品名／価格／個数］の値をクエリで取得する処理 */
    useEffect(() => {
        const { productName, price, quantity, prdImg } = router.query;
        if ( productName && price && quantity && prdImg ) {
            const productToAdd: Product = {
                product_name: productName as string,
                price: parseInt(price as string),
                quantity: parseInt(quantity as string),
                img_full_path: prdImg as string,
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
    const removeFromCart = (index: number) => {
        // セッションストレージから既存の商品情報と個数を取得する
        const storedProducts = JSON.parse(sessionStorage.getItem("cart") || "[]");
        // 該当商品を削除する
        storedProducts.splice(index, 1);
        // 更新した商品情報と個数をセッションストレージに保存する
        sessionStorage.setItem("cart", JSON.stringify(storedProducts));
        // stateを更新して画面に反映
        setProducts([...storedProducts]);
    };

    /* 商品の個数を更新できるようにする処理（引数indexは更新する商品のインデックス、引数newQuantityはその商品の新しい個数） */
    const updateQuantity = (index: number, newQuantity: number) => {
        // products配列内の要素を新しい配列updatedProductsにコピーする（＝updatedProductsを変更してもproductsに影響しない）
        const updatedProducts = [...products];
        // updatedProducts内の商品（引数index）の個数を更新する
        updatedProducts[index].quantity = newQuantity;
        sessionStorage.setItem("cart", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    /*  各商品の小計を計算する関数 */
    const calSubTotal = (product: Product) => {
        return product.price * product.quantity;
    };
    /*  全ての商品の小計を合計する関数 */
    const calTotal = () => {
        return products.reduce((total, product) => total + calSubTotal(product), 0);
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>商品名</th>
                            <th>単価</th>
                            <th>個数</th>
                            <th>小計</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className={styles.prdImg}>
                                    <img src={`/products/${product.img_full_path}`} alt={product.product_name} />
                                </td>
                                <td className={styles.prdName}>{product.product_name}</td>
                                <td className={styles.prdPrice}>¥{Number(product.price).toLocaleString()}</td>
                                <td className={styles.prdQty}>
                                    <button onClick={() => updateQuantity(index, Math.max(product.quantity - 1, 1))}>-</button>
                                    <input
                                        type="text"
                                        value={product.quantity}
                                        readOnly
                                    />
                                    <button onClick={() => updateQuantity(index, Math.min(product.quantity + 1, 10))}>+</button>
                                </td>
                                <td className={styles.subTotal}>¥{calSubTotal(product).toLocaleString()}</td>
                                <td className={styles.deleteBtn}><button onClick={() => removeFromCart(index)}>削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.totalAmount}>商品合計（税込）<span>¥{calTotal().toLocaleString()}</span></div>
            <button>買い物を続ける</button>
            <button>購入手続きに進む</button>
        </div>
    )
}