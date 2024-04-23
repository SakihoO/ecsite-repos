/* カートコンポーネント */
import { useEffect, useState } from "react";
import styles from "./Cart.module.scss"
import { useRouter } from "next/router";
import Button from "../Button/Button";
import utilStyles from "../../styles/utils.module.scss"

// 各カラムのデータ型を指定
interface Product {
    product_id: number;
    product_name: string;
    price: number;
    total_count: number | string;
    img_full_path: string;
    id: number;
}

export default function Cart() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
                const response = await fetch(`/api/cart?user_id=${user_id}&purchase_status=未購入`);
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

    /* 商品の個数を更新できるようにする処理 indexはproducts 配列内の特定の商品の位置を示す */
    const handlePrdCountUpdate = async (index: number, change: number) => {
        const updatedProducts = [...products];

        // cart.jsで定義したtotal_countが文字列で取れてしまうため、型変更を行う
        const numUpdatedProducts = Number(updatedProducts[index].total_count);
        const newPrdCount = numUpdatedProducts + change;

        // 商品個数の最低値を1、最高値を10に設定
        if (newPrdCount >= 1 && newPrdCount <= 10) {
            // 配列updatedProductsのtotal_countに新しい値(newPrdCount)を代入する
            updatedProducts[index].total_count = newPrdCount;

            try {
                const response = await fetch(`/api/updateProductCount?product_id=${products[index].product_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ change })
                });

                if (!response.ok) {
                    throw new Error(`APIエラー: ${response.statusText}`);
                } else {
                // 商品情報の更新が成功した場合に状態を更新
                setProducts(updatedProducts);
                calTotalAmount(updatedProducts);
                }

            } catch (error) {
                if (error instanceof Error) {
                    console.error('APIエラー:', error.message);
                } else {
                    console.error('APIエラー:', error);
                }
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
            return accumulator + (product.price * Number(product.total_count));
        }, 0);
        setTotalAmount(total);
    };

    /* 「買い物を続ける」をクリック->トップページに遷移 */
    const handleTopPage = () => {
        router.push('/');
    };

    /* 「購入手続きに進む」をクリック->購入手続き画面に遷移 */
    const handlePurchaseConfirm = async () => {
        // カートに商品が存在するかどうか
        if (products.length > 0) {
            try {
                const user_id = sessionStorage.getItem("user_id");
                const response = await fetch(`/api/purchaseInfo?user_id=${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    // 取得した情報をセッションストレージに保存して購入手続き画面で利用する
                    sessionStorage.setItem("purchase_information", JSON.stringify(data));
                    router.push('/purchase/confirm');
                } else {
                    setError('購入情報の取得に失敗しました。');
                }
            } catch (error) {
                console.error('購入情報の取得に失敗しました:', error);
                setError('購入情報の取得に失敗しました。');
            }
        } else {
            // カートに商品が存在しない場合はエラーダイアログを表示する
            setError('カートに商品が入っていません。')
        }
    }

    // エラーダイアログの「OK」をクリックするとエラーダイアログを削除する処理
    const handleOkButtonClick = () => {
        setError(null);
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
                            <th>個数<p className={styles.prdAltText}>おひとり様10点まで</p></th>
                            <th>小計</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
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
                                            console.log('-更新Product ID:', product.product_id);
                                            handlePrdCountUpdate(index, -1)
                                        }}>-</button>
                                            <input
                                                type="text"
                                                value={product.total_count}
                                                readOnly
                                            />
                                        <button onClick={() => {
                                            console.log('+更新Product ID:', product.product_id);
                                            handlePrdCountUpdate(index, +1)
                                        }}>+</button>
                                    </td>
                                    <td className={styles.subTotal}>¥{(product.price * Number(product.total_count)).toLocaleString()}</td>
                                    <td className={styles.deleteBtn}>
                                        <button onClick={() => {
                                            console.log('削除Product ID:', product.product_id);
                                            handleDelete(product.product_id);
                                        }}>削除</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.totalAmount}>商品合計（税込）<span>¥{totalAmount.toLocaleString()}</span></div>
            <Button
                onClick={handlePurchaseConfirm}
                text={'購入手続きに進む'}
            />
            <Button
                onClick={handleTopPage}
                text={'買い物を続ける'}
                variant={'back'}
            />

            {error && (
                <div className={utilStyles.errorContainer}>
                    <div className={utilStyles.errorBox}>
                        <div className={utilStyles.errorText}>{error}</div>
                        <button className={utilStyles.okButton} onClick={handleOkButtonClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    )
}