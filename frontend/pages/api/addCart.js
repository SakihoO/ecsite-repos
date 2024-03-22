/* CartテーブルにユーザーIDと商品情報を追加するAPIエンドポイント */
import mysql from 'mysql';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        // POST メソッドでのみリクエストを受け付ける
        const { user_id, product_id, product_count, purchase_status } = req.body;

        // データベースに接続してカートに商品を追加する
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'sakihookamoto',
            password: 'int01',
            database: 'repos_db',
            port: '3306'
        });

        connection.connect();

        // Cartテーブルに同じproduct_idが存在するかどうかを確認する
        connection.query(
            `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`,
            [user_id, product_id],
            function (error, result, fields) {
                if (error) {
                    console.error('カートに商品を追加中にエラーが発生しました:', error);
                    res.status(500).json({ message: 'カートに商品を追加中にエラーが発生しました。' });
                } else {
                    if (result.length === 0) {
                        // Cartテーブルに同じproduct_idが存在しない場合、新規レコードを挿入する
                        connection.query(
                            `INSERT INTO cart (user_id, product_id, product_count, purchase_status) VALUES (?, ?, ?, ?)`,
                            [user_id, product_id, product_count, purchase_status],
                            function (error, result, fields) {
                                if (error) {
                                    console.error('カートに商品を追加中にエラーが発生しました:', error);
                                    res.status(500).json({ message: 'カートに商品を追加中にエラーが発生しました。' });
                                } else {
                                    res.status(200).json({ message: 'カートに商品を追加しました。' });
                                }
                                connection.end(); // クエリ実行後に接続を閉じる
                            }
                        );
                    } else {
                        // Cartテーブルに同じproduct_idが存在する場合、該当のレコードのproduct_countを+1する
                        connection.query(
                            `UPDATE cart SET product_count = product_count + ? WHERE user_id = ? AND product_id = ?`,
                            [product_count, user_id, product_id],
                            function (error, result, fields) {
                                if (error) {
                                    console.error('カートに商品を追加中にエラーが発生しました:', error);
                                    res.status(500).json({ message: 'カートに商品を追加中にエラーが発生しました。' });
                                } else {
                                    res.status(200).json({ message: 'カートの商品を更新しました。' });
                                }
                                connection.end(); // クエリ実行後に接続を閉じる
                            }
                        );
                    }
                }
            }
        );
    } else {
    res.status(405).end(); // POST以外のリクエストは許可しない
    }
}