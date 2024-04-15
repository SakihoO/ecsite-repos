/* カート画面にCartテーブルの商品情報・個数を出力するAPIエンドポイント */
import pool from './db.connection';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        // GET メソッドでのみリクエストを受け付ける
        try {
            // リクエストからユーザーIDを取得する
            const user_id = req.query.user_id;

            const connection = await pool.getConnection();
            const [result] = await connection.query(
                `SELECT
                    mst_product.product_name,
                    mst_product.price,
                    mst_product.img_full_path,
                    SUM(cart.product_count) as total_count,
                    cart.product_id
                FROM cart
                INNER JOIN mst_product ON cart.product_id = mst_product.id
                WHERE cart.user_id = ? AND cart.purchase_status = '未購入'
                GROUP BY mst_product.id`,
                [user_id]
            );

            res.status(200).json(result);

            connection.release();
        } catch (error) {
            console.error('カートアイテムの取得に失敗しました:', error);
            res.status(500).json({ message: 'カートアイテムの取得に失敗しました。' });
        }
    } else {
        res.status(405).end(); // GET以外のリクエストは許可しない
    }
}