/* 購入情報をpurchase_historyテーブルに登録するAPIエンドポイント */
import mysql from 'mysql';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // リクエストから必要な情報を取得
            const { user_id, cart_id, status, purchased_at } = req.body;

            // MySQLデータベースに接続
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'sakihookamoto',
                password: 'int01',
                database: 'repos_db',
                port: '3306'
            });

            // トランザクション開始
            connection.beginTransaction(function(err) {
                if (err) {
                    throw err;
                }

                // 購入情報を格納するSQLクエリ
                const purchaseQuery = `INSERT INTO purchase_history (user_id, cart_id, status) VALUES (?, ?, ?)`;

                // カートの購入ステータスを更新するSQLクエリ
                const cartQuery = `UPDATE cart SET purchase_status = '購入済み' WHERE id = ?`;

                // purchaseQueryを実行する
                connection.query(purchaseQuery, [user_id, cart_id, status], function (error, results, fields) {
                    if (error) {
                        // エラーが発生した場合はトランザクションをロールバックし変更を元に戻す
                        return connection.rollback(function() {
                            console.error('購入情報の格納に失敗しました:', error);
                            res.status(500).json({ message: '購入情報の格納に失敗しました' });
                        });
                    }

                    // purchaseQueryの実行が成功した場合は、cartQueryを実行する
                    connection.query(cartQuery, [cart_id], function (error, results, fields) {
                        if (error) {
                            // エラーが発生した場合はトランザクションをロールバックし変更を元に戻す
                            return connection.rollback(function() {
                                console.error('カートの購入ステータスの更新に失敗しました:', error);
                                res.status(500).json({ message: 'カートの購入ステータスの更新に失敗しました' });
                            });
                        }

                        // 全てのクエリ実行が成功した場合は、トランザクションをコミットし変更を確定する
                        connection.commit(function(err) {
                            if (err) {
                                // エラーが発生した場合はトランザクションをロールバックし変更を元に戻す
                                return connection.rollback(function() {
                                    console.error('トランザクションのコミットに失敗しました:', error);
                                    res.status(500).json({ message: 'トランザクションのコミットに失敗しました' });
                                });
                            }

                            // 成功レスポンス
                            console.log('購入情報が正常に格納され、カートのステータスが更新されました');
                            res.status(200).json({ message: '購入情報が正常に格納され、カートのステータスが更新されました' });
                        });
                    });
                });
            });

        } catch (error) {
            console.error('購入情報の格納に失敗しました:', error);
            res.status(500).json({ message: '購入情報の格納に失敗しました' });
        }
    } else {
        res.status(405).end(); // POST以外のリクエストは許可しない
    }
}
