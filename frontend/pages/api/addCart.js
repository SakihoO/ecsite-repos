/* CartテーブルにユーザーIDと商品情報を追加するAPIエンドポイント */
import pool from './db.connection';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        // POST メソッドでのみリクエストを受け付ける
        const { user_id, product_id, product_count, purchase_status } = req.body;

        try {
            const connection = await pool.getConnection();

            // Cartテーブルに同じproduct_idが存在し、かつpurchase_statusが「購入済み」でないかどうかを確認する
            const [result] = await connection.query(
                `SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND (purchase_status IS NULL OR purchase_status <> '購入済み')`,
                [user_id, product_id]
            );

            if (result.length === 0) {
                // Cartテーブルに同じproduct_idが存在しない場合、新規レコードを挿入する
                await connection.query(
                    `INSERT INTO cart (user_id, product_id, product_count, purchase_status, createdAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
                    [user_id, product_id, product_count, purchase_status]
                );
                res.status(200).json({ message: 'カートに商品を追加しました。' });

            } else {
                // 現在DBに登録されている商品個数を取得する
                const currentProductCount = result[0].product_count;

                if (currentProductCount + product_count > 10) {
                    // DBに登録されている商品個数と、追加する個数が10以上の場合はエラーメッセージを返す
                    res.status(400).json({ message: 'カートに同じ商品が10個入っています。' });
                } else {
                    // Cartテーブルに同じproduct_idが存在する場合、該当のレコードのproduct_countを+1する
                    await connection.query(
                        `UPDATE cart SET product_count = product_count + ? WHERE user_id = ? AND product_id = ?`,
                        [product_count, user_id, product_id]
                    );
                    res.status(200).json({ message: 'カートの商品を更新しました。' });
                }
            }

            connection.release();
        } catch (error) {
            console.error('カートに商品を追加中にエラーが発生しました:', error);
            res.status(500).json({ message: 'カートに商品を追加中にエラーが発生しました。' });
        }
    } else {
    res.status(405).end(); // POST以外のリクエストは許可しない
    }
}