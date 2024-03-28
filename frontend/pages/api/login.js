/* ログイン認証用API */
import mysql from 'mysql';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        // メソッドが許可されていない場合は405エラーを返す
        return res.status(405).end();
    }

    const { user_name, password } = req.body;

    //MySQL接続情報
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'sakihookamoto',
        password: 'int01',
        database: 'repos_db',
        port: '3306'
    });

    // データベースに接続してユーザーを検索する
    connection.connect();
    connection.query(
        `SELECT * FROM mst_user WHERE user_name = ?`,
        [user_name, password],
        function (error, result, fields) {
            if (error) {
                console.error('ログイン中にエラーが発生しました。:', error);
                res.status(500).json({ message: 'ログイン中にエラーが発生しました。' });
            } else {
                if (result.length > 0) {
                    // ユーザーが見つかった場合 -> パスワードを比較する
                    // データベースから取得したハッシュ化されたパスワード
                    const hashedPassword = result[0].password;

                    // bcryptを使用して、DBから取得したハッシュ化されたパスワードと、送信された平文のパスワードを比較する
                    if (bcrypt.compareSync(password, hashedPassword)) {
                        // パスワードが一致する場合 -> ログイン成功
                        res.status(200).json({ message: 'ログインに成功しました。', id: result[0].id }); // ユーザーIDを返す
                    } else {
                        // パスワードが一致しない場合
                        res.status(401).json({ message: 'パスワードが一致しません。'});
                    }
                } else {
                    // ユーザーが見つからない場合
                    res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません。'});
                }
            }
        }
    );
    connection.end();
}