/* 購入手続き画面へ情報を受け渡すAPIエンドポイント */
import pool from './db.connection';

export default async function handler(req,res) {
    if (req.method === 'GET') {
        try {
            const user_id = req.query.user_id;

            const connection = await pool.getConnection();

            const [result] = await connection.query(
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
                    cart.product_count,
                    cart.id
                FROM cart
                INNER JOIN mst_user ON cart.user_id = mst_user.id
                INNER JOIN mst_product ON cart.product_id = mst_product.id
                WHERE cart.user_id = ? AND cart.purchase_status = '未購入'`,
                [user_id]
            );

            res.status(200).json(result);

            connection.release();
        } catch (error) {
            console.error('購入情報の取得に失敗しました。:', error);
            res.status(500).json({ message: '購入情報の取得に失敗しました。:' });
        }
    } else {
        res.status(405).end(); // GET以外のリクエストは許可しない
    }
}