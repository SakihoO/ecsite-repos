/* カート画面商品削除用エンドポイント */
import pool from '../db.connection';

export default async function handler(req, res) {
    const { product_id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const connection = await pool.getConnection();

            const [result] = await connection.query(
                `DELETE FROM cart WHERE product_id = ?`,
                [product_id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ product_id });
            } else {
                res.status(404).json({ message: '指定された商品が見つかりません。' });
            }

            connection.release();
        } catch (error) {
            console.error('商品の削除中にエラーが発生しました：', error);
            res.status(500).json({ message: '商品の削除中にエラーが発生しました。'});
        }
    } else {
        res.status(405).end(); // DELETE以外のリクエストは許可しない
    }
}