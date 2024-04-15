/* 商品個数の更新用APIエンドポイント */
import pool from './db.connection';

export default async function handler(req, res) {
    const { product_id } = req.query;
    const { change } = req.body;

    if (req.method === 'PUT') {
        try {
            const connection = await pool.getConnection();

            // カートの商品個数を更新するクエリ
            const [result] = await connection.execute(
                `UPDATE cart SET product_count = product_count + ? WHERE product_id = ?`,
                [change, product_id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ product_id });
                console.log('商品が見つかりました');
            } else {
                console.log('商品が見つかりません');
                res.status(404).json({ message: '指定された商品が見つかりません。' });
            }

            // コネクションを解放
            connection.release();

        } catch (error) {
            console.error('商品の個数の更新に失敗しました:', error);
            res.status(500).json({ message: '商品の個数の更新に失敗しました。' });
        }
    } else {
        res.status(405).end(); // PUT以外のリクエストは許可しない
    }
}
