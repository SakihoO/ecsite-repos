/* カートコンポーネント */
import { useEffect, useState } from "react";
import styles from "./Cart.module.scss"
import { useRouter } from "next/router";
import session from "next-session";

// 各カラムのデータ型を指定
interface Product {
    product_id: number;
    product_name: string;
    price: number;
    total_count: number;
    img_full_path: string;
}

export default function Cart() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // セッションストレージからログイン状態を取得する
        const isLoggedInSession = sessionStorage.getItem("isLoggedIn");
        if (isLoggedInSession === "true" ) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            // ログアウト時はカート情報をクリアする
            setProducts([]);
            setTotalAmount(0);
        }

        // セッションストレージからユーザーIDを取得する
        const user_id = sessionStorage.getItem("user_id");

        // カート情報を取得する関数
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`/api/cart?user_id=${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                    calTotalAmount(data);
                } else {
                    console.error('カートアイテムの取得に失敗しました:', response.statusText);
                }
            } catch (error) {
                console.error('カートアイテムの取得に失敗しました:', error);
            }
        };

        // ログイン状態が変更された場合にカート状態を取得する
        if (isLoggedIn) {
            fetchCartItems();
        }
    }, [isLoggedIn]);

    /* 商品の個数を更新できるようにする処理 */
    const handlePrdCountUpdate = async (index: number, change: number) => {
        const updatedProducts = [...products];
        const newPrdCount = products[index].total_count + change;
        if (newPrdCount >= 1 && newPrdCount <= 10) {
            updatedProducts[index].total_count = newPrdCount;
            setProducts(updatedProducts);

            // データベースの該当商品の個数を更新するためのAPIエンドポイントを呼び出す
            try {
                // products配列から特定の商品を取得するためにindexを使用し、商品のproduct_idを取得する
                const response = await fetch(`/api/updateProductCount?product_id=${products[index].product_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ change }) // 増減する数をパラメータとして渡す
                });
                if(!response.ok) {
                    console.error('商品の個数の更新に失敗しました:' ,response.statusText);
                } else {
                    calTotalAmount(updatedProducts);
                }
            } catch(error) {
                console.error('商品の個数の更新に失敗しました:', error);
            }
        }
    };

    /* カート商品の削除処理（product_idを使用） */
    const handleDelete = async (product_id: number) => {
        try {
            const response = await fetch(`/api/deleteProduct/${product_id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // 削除された商品を除いた新しいカート商品リストを作成する（配列productsから削除された商品をフィルタリングする）
                const updatedProducts = products.filter(product => product.product_id !== product_id);
                setProducts(updatedProducts);
                calTotalAmount(updatedProducts);
            } else {
                console.error('商品の削除に失敗しました:', response.statusText);
            }
        } catch (error) {
            console.error('商品の削除に失敗しました:', error);
        }
    };

    /* 全ての商品の小計を合算する関数 */
    const calTotalAmount = (products: Product[]) => {
        const total = products.reduce((accumulator, product) => {
            return accumulator + (product.price * product.total_count);
        }, 0);
        setTotalAmount(total);
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
                    <tbody>{products.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.emptyCartMsg}>カートに商品が入っていません。</td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <tr key={index}>
                                <td className={styles.prdImg}>
                                    <img src={`/products/${product.img_full_path}`} alt={product.product_name} />
                                </td>
                                <td className={styles.prdName}>{product.product_name}</td>
                                <td className={styles.prdPrice}>¥{Number(product.price).toLocaleString()}</td>
                                <td className={styles.prdQty}>
                                    <button onClick={() => {
                                        console.log('+更新Product ID:', product.product_id);
                                        handlePrdCountUpdate(index, -1)
                                    }}>-</button>
                                        <input
                                            type="text"
                                            value={product.total_count}
                                            readOnly
                                        />
                                    <button onClick={() => {
                                        console.log('-更新Product ID:', product.product_id);
                                        handlePrdCountUpdate(index, +1)
                                    }}>+</button>
                                </td>
                                <td className={styles.subTotal}>¥{(product.price * product.total_count).toLocaleString()}</td>
                                <td className={styles.deleteBtn}>
                                    <button onClick={() => {
                                        console.log('削除Product ID:', product.product_id);
                                        handleDelete(product.product_id);
                                    }}>削除</button>
                                </td>
                            </tr>
                        ))
                    )
                }

                    </tbody>
                </table>
            </div>
            <div className={styles.totalAmount}>商品合計（税込）<span>¥{totalAmount.toLocaleString()}</span></div>
            <button>買い物を続ける</button>
            <button>購入手続きに進む</button>
        </div>
    )
}