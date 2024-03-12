/* CartテーブルにユーザーIDと商品情報を追加するAPIエンドポイント */
import mysql from 'mysql';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        // POST メソッドでのみリクエストを受け付ける
        const { user_id, product_id, product_count } = req.body;

        // データベースに接続してカートに商品を追加する
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'sakihookamoto',
            password: 'int01',
            database: 'repos_db',
            port: '3306'
        });

        connection.connect();
        connection.query(
            `INSERT INTO cart (user_id, product_id, product_count) VALUES (?, ?, ?)`,
            [user_id, product_id, product_count],
            function (error, result, fields) {
                if (error) {
                    console.error('カートに商品を追加中にエラーが発生しました:', error);
                    res.status(500).json({ message: 'カートに商品を追加中にエラーが発生しました。' });
                } else {
                    res.status(200).json({ message: 'カートに商品を追加しました。' });
                }
            }
        );
        connection.end();
    } else {
        res.status(405).end(); // POST以外のリクエストは許可しない
    }
}