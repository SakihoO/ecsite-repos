import Link from "next/link";
import { useState, useEffect } from "react";
import Layouts from "../../components/Layouts";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Title from "../../components/Layout/Title";
import ResultCount from "../../components/Products/ResultCount";
import utilStyles from "../../styles/utils.module.scss";
import SearchProducts from "../../components/Products/SearchProducts";

// 各カラムのデータ型を指定
interface Product {
    id: number;
    product_name: string;
    price: string;
    img_full_path: string;
}

export default function table() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            // category_idが2（テーブル）の商品データのみを取得する
            const response = await fetch('/api?category_id=2');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
          console.error('データの取得中にエラーが発生しました', error);
        }
      };
      fetchData();
    }, []);

    return (
        <Layouts>
            <Header searchQuery={undefined} />
                <div className={utilStyles.body}>
                    <Title
                        contentTitle={'テーブル'}
                        subTitle={'Table'}
                    />
                    <ResultCount
                        resultNumber={products.length.toString()}
                    />
                    <div className={utilStyles.boxParent}>
                        {products.map((product, index) => (
                            <SearchProducts
                                key={index}
                                prdDetailLink={`/product/${product.id}`}
                                prdImage={product.img_full_path}
                                prdName={product.product_name}
                                prdPrice={product.price}
                            />
                        ))}
                    </div>
                </div>
            <Footer />
        </Layouts>
    );
}