/* 商品詳細ページ */

import { useRouter } from "next/router";
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

export default function() {
    const router = useRouter();
    const { id } =router.query;
    const [product, setProduct] = useState<Product | null>(null);

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
                            <div className={utilStyles.prdQty}>個数<input type="number" placeholder="1" min="1" max="10" /></div>
                            <div className={utilStyles.prdPrice}>¥{Number(product.price).toLocaleString()}</div>
                            {/* <Button
                                // link={'/member/kakunin'}
                                text={'カートに入れる'}
                                onClick={() => {}}
                            /> */}
                        </div>
                        {/* <input type="submit" /> */}
                    </div>
                </div>
            </div>
            <Footer />
        </Layouts>
    );
}