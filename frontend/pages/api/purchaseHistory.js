/* 購入情報をpurchase_historyテーブルに登録するAPIエンドポイント */
import pool from './db.connection';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // リクエストから必要な情報を取得
            const { user_id, cart_id, status, purchased_at } = req.body;

            const connection = await pool.getConnection();

            // トランザクション開始
            connection.beginTransaction();

            try {
                // 購入情報を格納するSQLクエリ
                const purchaseQuery = `INSERT INTO purchase_history (user_id, cart_id, status, purchased_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;

                // カートの購入ステータスを更新するSQLクエリ
                const cartQuery = `UPDATE cart SET purchase_status = '購入済み' WHERE id = ?`;

                // purchaseQueryを実行する
                await connection.query(purchaseQuery, [user_id, cart_id, status, purchased_at]);

                // cartQueryを実行する
                connection.query(cartQuery, [cart_id]);

                // トランザクションをコミット
                await connection.commit();

                // 成功レスポンス
                console.log('購入情報が正常に格納され、カートのステータスが更新されました');
                res.status(200).json({ message: '購入情報が正常に格納され、カートのステータスが更新されました' });

            } catch (error) {
                // トランザクションをロールバック
                await connection.rollback();
                console.error('トランザクションの実行中にエラーが発生しました:', error);
                res.status(500).json({ message: '購入情報の格納中にエラーが発生しました' });
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('MySQL接続エラー:', error);
            res.status(500).json({ message: 'MySQL接続中にエラーが発生しました' })
        }
    } else {
        res.status(405).end(); // POST以外のリクエストは許可しない
    }
}
