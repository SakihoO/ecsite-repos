/* カート画面商品削除用エンドポイント */
import mysql from 'mysql';

export default async function handler(req, res) {
    const { product_id } = req.query;
    
    if (req.method === 'DELETE') {
        try {
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'sakihookamoto',
                password: 'int01',
                database: 'repos_db',
                port: '3306'
            });

            connection.connect();
            connection.query(
                `DELETE FROM cart WHERE product_id = ?`,
                [product_id],
                function (error, result, fields) {
                    if (error) {
                        console.error('商品の削除中にエラーが発生しました:', error);
                        res.status(500).json({ message: '商品の削除中にエラーが発生しました。' });
                    } else {
                        res.status(200).json({ product_id });
                    }
                }
            );
            connection.end();
        } catch (error) {
            console.error('商品の削除に失敗しました：', error);
            res.status(500).json({ message: '商品の削除に失敗しました '});
        }
    } else {
        res.status(405).end(); // DELETE以外のリクエストは許可しない
    }
}