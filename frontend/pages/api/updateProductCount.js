/* 商品個数の更新用APIエンドポイント */
import mysql from 'mysql';

export default async function handler(req, res) {
    if(req.method === 'PUT') {
        const { product_id } = req.query;
        const { change } = req.body;

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
                `UPDATE cart SET product_count = product_count + ? WHERE product_id = ?`,
                [change, product_id],
                function(error, result, fields) {
                    if(error) {
                        console.error('商品の個数の更新中にエラーが発生しました:', error);
                        res.status(500).json({ message: '商品の個数の更新に失敗しました。'});
                    } else {
                        res.status(200).end();
                    }
                }
            );
            connection.end();
        } catch(error) {
            console.error('商品の個数の更新に失敗しました:', error);
            res.status(500).json({ message: '商品の個数の更新に失敗しました。' });
        }
    }else {
        res.status(405).end(); // PUT以外のリクエストは許可しない
    }
}