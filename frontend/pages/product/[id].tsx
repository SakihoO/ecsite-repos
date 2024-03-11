/* 商品詳細ページ */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import Button from "../../components/Button/Button";
import Layouts from "../../components/Layouts";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Title from "../../components/Layout/Title";
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
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [product_count, setProduct_count] = useState(1);

    useEffect(() => {
        if(id) {
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
            fetchProductDetail();
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    // 「カートに入れる」ボタンのクリックハンドラー関数
    const handleAddToCart = async () => {
        console.log('追加Product ID:', id);
        try {
            const response = await fetch('/api/addCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: sessionStorage.getItem("user_id"),
                    product_id: id,
                    product_count: product_count,
                }),
            });
            if(response.ok) {
                router.push('/purchase/cart');
            } else {
                console.error('カートに追加でエラーが発生しました:', response.statusText);
            }
        } catch (error) {
            console.error('カートに追加でエラーが発生しました:', error);
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
                                <button onClick={() => setProduct_count(Math.max(product_count - 1, 1))}>-</button>
                                <input
                                    type="text"
                                    value={product_count}
                                    readOnly
                                    placeholder="1"
                                />
                                <button onClick={() => setProduct_count(Math.min(product_count + 1, 10))}>+</button>
                            </div>
                            <div className={utilStyles.prdPrice}>¥{Number(product.price).toLocaleString()}</div>
                            {/* <Button
                                // link={'/purchase/cart'}
                                text={'カートに入れる'}
                                onClick={addToCart}
                            /> */}
                            <button onClick={handleAddToCart}>カートに入れる</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Layouts>
    );
}