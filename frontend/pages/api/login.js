/* ログイン認証用API */
// import dbConnection from './db.connection';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//     if(req.method !== 'POST') {
//         // メソッドが許可されていない場合は405エラーを返す
//         return res.status(405).end();
//     }

//     const { user_name, password } = req.body;

//     try {
//         dbConnection.connect();
//         dbConnection.query(
//             `SELECT * FROM mst_user WHERE user_name = ?`,
//             [user_name, password],
//             function (error, result, fields) {
//                 if (error) {
//                     console.error('ログイン中にエラーが発生しました。:', error);
//                     res.status(500).json({ message: 'ログイン中にエラーが発生しました。' });
//                 } else {
//                     if (result.length > 0) {
//                         // ユーザーが見つかった場合 -> パスワードを比較する
//                         // データベースから取得したハッシュ化されたパスワード
//                         const hashedPassword = result[0].password;

//                         // bcryptを使用して、DBから取得したハッシュ化されたパスワードと、送信された平文のパスワードを比較する
//                         if (bcrypt.compareSync(password, hashedPassword)) {
//                             // パスワードが一致する場合 -> ログイン成功
//                             res.status(200).json({ message: 'ログインに成功しました。', id: result[0].id }); // ユーザーIDを返す
//                         } else {
//                             // パスワードが一致しない場合
//                             res.status(401).json({ message: 'パスワードが一致しません。'});
//                         }
//                     } else {
//                         // ユーザーが見つからない場合
//                         res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません。'});
//                     }
//                 }
//                 dbConnection.end();
//             }
//         );
//     } catch (err) {
//         console.error("MySQLデータ取得エラー", err);
//         res.status(500).json({ error: 'Internal Server Error '});
//     }
// }


// import pool from './db.connection'; // db.connection モジュールからコネクションプールをインポート
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).end(); // 許可されていないメソッドの場合は405エラーを返す
//     }

//     const { user_name, password } = req.body;

//     try {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 console.error('MySQLデータベース接続エラー', err);
//                 return res.status(500).json({ error: 'データベースに接続できませんでした。' });
//             }

//             const query = `SELECT * FROM mst_user WHERE user_name = ?`;
//             connection.query(query, [user_name], async (error, result, fields) => {
//                 connection.release(); // コネクションを解放

//                 if (error) {
//                     console.error('ログイン中にエラーが発生しました。:', error);
//                     return res.status(500).json({ message: 'ログイン中にエラーが発生しました。' });
//                 }

//                 if (result.length > 0) {
//                     const hashedPassword = result[0].password;

//                     if (await bcrypt.compare(password, hashedPassword)) {
//                         res.status(200).json({ message: 'ログインに成功しました。', id: result[0].id });
//                     } else {
//                         res.status(401).json({ message: 'パスワードが一致しません。'});
//                     }
//                 } else {
//                     res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません。'});
//                 }
//             });
//         });
//     } catch (err) {
//         console.error("MySQLデータ取得エラー", err);
//         res.status(500).json({ error: 'Internal Server Error '});
//     }
// }



import pool from './db.connection';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // 許可されていないメソッドの場合は405エラーを返す
    }

    const { user_name, password } = req.body;

    try {
        const connection = await pool.getConnection();

        const sql = `SELECT id, user_name, password FROM mst_user WHERE user_name = ?`;
        const results = await connection.execute(sql, [user_name]); // パスワードはクエリ内で比較するため、パラメータから除外
        console.log(results[0]);

        connection.release(); // コネクションを解放

        console.log("Database Password:", results[0][0].password);
        console.log("Input Password:", password);

        if (results.length > 0) {
            const hashedPassword = results[0][0].password; // データベースから取得したハッシュ化されたパスワード 配列構造のため[0][0]でないとエラーになる
            const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

            if (isPasswordMatch) {
                res.status(200).json({ message: 'ログインに成功しました。', id: results[0][0].id });
            } else {
                res.status(401).json({ message: 'パスワードが一致しません。'});
            }
        } else {
            res.status(401).json({ message: 'ユーザー名またはパスワードが正しくありません。'});
        }
    } catch (err) {
        console.error("MySQLデータ取得エラー", err);
        res.status(500).json({ error: 'Internal Server Error '});
    }
}
