/* user_nameから該当のuser_id（id）を取得するAPIエンドポイントファイル */
import pool from './db.connection';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const user_name = req.query.user_name;

            const connection = await pool.getConnection();
            const query = `SELECT id FROM mst_user WHERE user_name = ?`;

            const [results] = await connection.query(query, [user_name]);

            if (results.length > 0) {
                const user_id = results[0].id;
                res.status(200).json({ user_id });
            } else {
                res.status(404).json({ message: 'ユーザーが見つかりませんでした' });
            }

            connection.release();
        } catch (error) {
            console.error('データベースエラー:', error);
            res.status(500).json({ message: 'データベースエラー' });
        }
    } else {
        res.status(405).end(); // GET以外のリクエストは許可しない
    }
}
