/* 商品詳細ページ */
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";

import Link from "next/link";
import Button from "../../components/Button/Button";
import Layouts from "../../components/Layouts";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Title from "../../components/Layout/Title";
import DetailProduct from "../../components/Products/DetailProduct";
import utilStyles from "../../styles/utils.module.scss";

// 各カラムのデータ型を指定
interface Product {
    category_name: string;
    category_sub_name: string;
    id: number;
    product_name: string;
    product_size: string;
    price: number;
    img_full_path: string;
}

export default function ProductDetail() {
    const router = useRouter();
    const { id } =router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [ quantity, setQuantity] = useState(1);

    useEffect(() => {
        // 商品の詳細情報を取得するAPIを呼び出す
        const fetchProductDetail = async () => {
            try {
                // 商品のidに基づいて、/api/products/${id}エンドポイントに対してfetchメソッドを使用してデータを取得し、取得したデータをsetProductでproductステートに設定する
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        if(id) {
            fetchProductDetail();
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    /* 商品をカートに追加する処理 */
    const addToCart = async() => {
        if(product) {
            router.push(`/purchase/cart?prdName=${encodeURIComponent(product.product_name)}&price=${product.price}&quantity=${quantity}&prdImg=${product.img_full_path}`);
            // try {
            //     // バックエンドのエンドポイントURLを構築
            //     const apiUrl = `/pages/api/addCart.js`;
            //     const quantityToAdd = { product_name: product.product_name, price: product.price, quantity:quantity };
            //     // POSTリクエストを送信してカートに商品を追加
            //     const response = await fetch(apiUrl, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ product: quantityToAdd }), // 商品情報と個数をリクエストボディに追加
            //     });
            //     if (response.ok) {
            //         console.log('商品がカートに正常に追加されました。');
            //         // カートに追加された場合、カートページに遷移
            //         router.push('/purchase/cart')
            //     } else {
            //         console.error('商品をカートに追加できませんでした。');
            //     }
            // } catch(error) {
            //     console.log('カートへの商品追加エラー：', error);
            // }
        }
    };

    return (
        <Layouts>
            <Header searchQuery={undefined} />
            <div className={utilStyles.body}>
                <Title
                    contentTitle={product.category_name}
                    subTitle={product.category_sub_name} />

                <div className={utilStyles.prdDetailArea}>
                    <div className={utilStyles.leftArea}>
                        <img src={`/products/${product.img_full_path}`} alt={product.product_name} />
                    </div>
                    <div className={utilStyles.rightArea}>
                        <div className={utilStyles.prdName}>{product.product_name}</div>
                        <div className={utilStyles.prdTxt}><span>Category -</span>{product.category_name}</div>
                        <div className={utilStyles.prdSize}><span>Size -</span>{product.product_size}</div>
                        <div className={utilStyles.prdSubmit}>
                            <div className={utilStyles.prdQty}><span>個数</span>
                                <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    placeholder="1"
                                />
                                <button onClick={() => setQuantity(Math.min(quantity + 1, 10))}>+</button>
                            </div>
                            <div className={utilStyles.prdPrice}>¥{Number(product.price).toLocaleString()}</div>
                            {/* <Button
                                // link={'/purchase/cart'}
                                text={'カートに入れる'}
                                onClick={addToCart}
                            /> */}
                            <button onClick={addToCart}>カートに入れる</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Layouts>
    );
}