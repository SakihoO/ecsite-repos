import { useEffect, useState } from "react";
import router from "next/router";
import styles from "./Confirm.module.scss";
import SubTitle from "../Layout/SubTitle";
import Title from "../Layout/Title";

interface Product {
    product_name: string;
    price: number;
    product_count: number;
    img_full_path: string;
}

export default function PurchaseConfirm()  {
    const [address, setAddress] = useState({
        family_name: "",
        first_name: "",
        prefecture: "",
        municipalities: "",
        street_address: "",
        apartment: ""
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // セッションストレージから購入情報を取得
        const purchaseInfo = sessionStorage.getItem("purchase_information");
        // const cart_id = sessionStorage.getItem("cart_id:", id);
        if (purchaseInfo !== null) {
            const data = JSON.parse(purchaseInfo);
            setAddress({
                family_name: data[0].family_name,
                first_name: data[0].first_name,
                prefecture: data[0].prefecture,
                municipalities: data[0].municipalities,
                street_address: data[0].street_address,
                apartment: data[0].apartment
            });
            setProducts(data);
            calculateTotalAmount(data);
        }
    }, []);

    const calculateTotalAmount = (products) => {
        const total = products.reduce((accumulator, product) => {
            return accumulator + (product.price * product.product_count);
        }, 0);
        setTotalAmount(total);
    };

    /* 「カートに戻る」をクリック->カート画面に遷移 */
    const handleCartPage = () => {
        router.push('/purchase/cart')
    }

    /* 「購入を確定する」をクリック->購入完了画面に遷移 */
    const handlePurchaseThanks = async () => {
        try {
            const user_id = sessionStorage.getItem('user_id');
            const purchaseInformation = sessionStorage.getItem("purchase_information");

            if (purchaseInformation !== null) {
                // 複数の商品を持つ場合、それぞれの商品に対して処理を行う
                JSON.parse(purchaseInformation).forEach(async (product) => {
                    const cart_id = product.id;

                    const response = await fetch("/api/purchaseHistory", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: user_id,
                            cart_id: cart_id,
                            status: 1,
                        })
                    });

                if (response.ok) {
                    console.log("購入が成功しました:", product.product_name);
                } else {
                    console.error('購入に失敗しました:', product.product_name);
                }
            });
             router.push('/purchase/thanks');
            } else {
                console.error('購入情報が取得できませんでした');
            }

        } catch (error) {
            console.error('購入時にエラーが発生しました:', error);
        }
    };

    return (
        <div>
            <Title
                contentTitle={'ご注文内容をご確認ください'}
                subTitle={'Order details'}
            />
            <div className={styles.body}>
                <SubTitle
                    contentTitle={'お届け先'}
                    subTitle={'Address'}
                />
                <div className={styles.container}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.fullName}>氏名</th>
                                <th className={styles.address}>住所</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{address.family_name} {address.first_name}</td>
                                <td>{address.prefecture}{address.municipalities}{address.street_address}{address.apartment}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.body}>
                <SubTitle
                    contentTitle={'ご注文商品'}
                    subTitle={'Ordered items'}
                />
                <div className={styles.container}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品名</th>
                                <th>単価</th>
                                <th>個数</th>
                                <th>小計</th>
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
                                    <td className={styles.prdQty}>{product.product_count}</td>
                                    <td className={styles.subTotal}>¥{(product.price * product.product_count).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.fee}>
                    <div className={styles.totalPrdAmount}>商品合計（税込）<span>¥{totalAmount.toLocaleString()}</span></div>
                    <div className={styles.shippingFee}>送料<span>¥0</span></div>
                    <div className={styles.totalAmount}>合計（税込）<span>¥{totalAmount.toLocaleString()}</span></div>
                </div>
            </div>
            <button onClick={handleCartPage}>カートに戻る</button>
            <button onClick={handlePurchaseThanks}>購入を確定する</button>
        </div>

    )
}