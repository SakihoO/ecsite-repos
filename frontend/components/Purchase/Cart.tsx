/* カートコンポーネント */
import { useEffect, useState } from "react";
import styles from "./Cart.module.scss"
import { useRouter } from "next/router";
import session from "next-session";

// 各カラムのデータ型を指定
interface Product {
    // id: number;
    product_name: string;
    price: number;
    total_count: number;
    img_full_path: string;
}

export default function Cart() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/api/cart');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('カートアイテムの取得に失敗しました:', response.statusText);
                }
            } catch (error) {
                console.error('カートアイテムの取得に失敗しました:', error);
            }
        };
        fetchCartItems();
    }, []);

    // const handleDelete = async (productId: number) => {
    //     try {
    //         const response = await fetch(`/api/${productId}`, {
    //             method: 'DELETE',
    //         });
    //         if (response.ok) {
    //             const updatedProducts = products.filter(product => product.id !== productId);
    //             setProducts(updatedProducts);
    //         } else {
    //             console.error('商品の削除に失敗しました:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('商品の削除に失敗しました:', error);
    //     }
    // };

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
                                <td className={styles.prdQty}>{product.total_count}</td>
                                <td className={styles.subTotal}>¥{(product.price * product.total_count).toLocaleString()}</td>
                                {/* <td className={styles.deleteBtn}>
                                    <button onClick={() => handleDelete(product.id)}>削除</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className={styles.totalAmount}>商品合計（税込）<span>¥{calTotal().toLocaleString()}</span></div> */}
            <button>買い物を続ける</button>
            <button>購入手続きに進む</button>
        </div>
    )
}