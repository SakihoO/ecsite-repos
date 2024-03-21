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

            // 接続
            connection.connect();

            // 購入情報を格納するSQLクエリを作成
            const query = `INSERT INTO purchase_history (user_id, cart_id, status) VALUES (?, ?, ?)`;

            // クエリを実行
            connection.query(query, [user_id, cart_id, status], function (error, results, fields) {
                // エラーハンドリング
                if (error) {
                    console.error('購入情報の格納に失敗しました:', error);
                    res.status(500).json({ message: '購入情報の格納に失敗しました' });
                } else {
                    console.log('購入情報が正常に格納されました');
                    res.status(200).json({ message: '購入情報が正常に格納されました' });
                }
            });

            // 接続を閉じる
            connection.end();
        } catch (error) {
            console.error('購入情報の格納に失敗しました:', error);
            res.status(500).json({ message: '購入情報の格納に失敗しました' });
        }
    } else {
        res.status(405).end(); // POST以外のリクエストは許可しない
    }
}
