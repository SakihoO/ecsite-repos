/* 購入手続き画面へ情報を受け渡すAPIエンドポイント */
import mysql from 'mysql';

export default async function handler(req,res) {
    if (req.method === 'GET') {
        try {
            const user_id = req.query.user_id;

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
                    mst_user.family_name,
                    mst_user.first_name,
                    mst_user.prefecture,
                    mst_user.municipalities,
                    mst_user.street_address,
                    mst_user.apartment,
                    mst_product.product_name,
                    mst_product.price,
                    mst_product.img_full_path,
                    cart.product_count
                FROM cart
                INNER JOIN mst_user ON cart.user_id = mst_user.id
                INNER JOIN mst_product ON cart.product_id = mst_product.id
                WHERE cart.user_id = ?`,
                [user_id],
                function (error, result, fields) {
                    if (error) {
                        console.error('購入情報の取得に失敗しました:', error);
                        res.status(500).json({ message: '購入情報の取得に失敗しました' });
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
            connection.end();
        } catch (error) {
            console.error('購入情報の取得に失敗しました。:', error);
            res.status(500).json({ message: '購入情報の取得に失敗しました。:' });
        }
    } else {
        res.status(405).end(); // GET以外のリクエストは許可しない
    }
}