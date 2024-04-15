/* ログイン認証用API（平文パスワード - DBに保存されたハッシュ化されたパスワードの比較） */
import pool from './db.connection';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // 許可されていないメソッドの場合は405エラーを返す
    }

    const { user_name, password } = req.body;

    try {
        const connection = await pool.getConnection();

        const sql = `SELECT * FROM mst_user WHERE user_name = ?`;
        const result = await connection.execute(sql, [user_name]); // パスワードはクエリ内で比較するため、パラメータから除外

        // DB接続終了後、パスワード比較前にコネクションを解放する
        connection.release();

        if (result.length > 0) {
            const hashedPassword = result[0][0].password; // データベースから取得したハッシュ化されたパスワード 配列構造のため[0][0]でないとエラーになる

            // ハッシュ化されたパスワードを比較
            const resultCompare = bcrypt.compareSync(password, hashedPassword);
            if (resultCompare) {
                // パスワードが一致する場合 -> ログイン成功
                console.log('ログインに成功しました。');
                res.status(200).json({ message: 'ログインに成功しました。', id: result[0][0].id }); // ユーザーIDを返す
            } else {
                // パスワードが一致しない場合
                console.log("パスワードが一致しません");
                res.status(401).json({ message: 'パスワードが一致しません。'});
            }

        } else {
            console.log("認証していない");
            res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません。'});
        }
    } catch (err) {
        console.error("MySQLデータ取得エラー", err);
        res.status(500).json({ error: 'Internal Server Error '});
    }
}