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

    useEffect(() => {
        const { productName, price, quantity } = router.query;
        if(productName && price &&quantity ) {
            setProducts([{ product_name: productName as string, price: parseInt(price as string), quantity: parseInt(quantity as string) }]);
        }
    }, [router.query]);


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
                                <td><button>削除</button></td>
                            </tr>
                        ))}

                        <tr>
                            <td>商品名２</td>
                            <td>単価２</td>
                            <td className={styles.prdQty}><input type="number" placeholder="1" min="1" max="10" /></td>
                            <td>¥80000</td>
                            <td><button>削除</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.totalAmount}>商品合計（税込）<span>小計の総額</span></div>
            <button>買い物を続ける</button>
            <button>購入手続きに進む</button>
        </div>
    )
}