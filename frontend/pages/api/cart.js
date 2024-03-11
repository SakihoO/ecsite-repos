/* カート画面にCartテーブルの商品情報・個数を出力するAPIエンドポイント */
import mysql from 'mysql';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        // GET メソッドでのみリクエストを受け付ける
        try {
            // データベースに接続してカート内の商品を取得する
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'sakihookamoto',
                password: 'int01',
                database: 'repos_db',
                port: '3306'
            });

            connection.connect();
            connection.query(
                `SELECT
                    mst_product.product_name,
                    mst_product.price,
                    mst_product.img_full_path,
                    SUM(cart.product_count) as total_count,
                    cart.product_id
                FROM cart
                INNER JOIN mst_product ON cart.product_id = mst_product.id
                GROUP BY mst_product.id`,
                function (error, result, fields) {
                    if (error) {
                        console.error('カートアイテムの取得に失敗しました:', error);
                        res.status(500).json({ message: 'カートアイテムの取得に失敗しました。' });
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
            connection.end();
        } catch (error) {
            console.error('カートアイテムの取得に失敗しました:', error);
            res.status(500).json({ message: 'カートアイテムの取得に失敗しました。' });
        }
    } else {
        res.status(405).end(); // GET以外のリクエストは許可しない
    }
}