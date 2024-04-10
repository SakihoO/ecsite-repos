/* 商品個数の更新用APIエンドポイント */
import pool from './db.connection';

export default async function handler(req, res) {
    if(req.method === 'PUT') {
        const { product_id } = req.query;
        const { change } = req.body;

        try {
            const connection = await pool.getConnection();

            const [result] = await connection.query(
                `UPDATE cart SET product_count = product_count + ? WHERE product_id = ?`,
                [change, product_id]
            );

            // 成功時はステータスコード200を返す
            res.status(200).end();

            connection.release();
        } catch (error) {
            console.error('商品の個数の更新に失敗しました:', error);
            res.status(500).json({ message: '商品の個数の更新に失敗しました。' });
        }
    }else {
        res.status(405).end(); // PUT以外のリクエストは許可しない
    }
}