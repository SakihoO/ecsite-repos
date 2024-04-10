/* 会員登録用API */
import pool from './db.connection';
import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).end(); // メソッドがPOSTでない場合はエラーを返す
//     }
//     // リクエストからデータを取得
//     const formData = req.body;

//     // MySQL接続
//     connection.connect((err) => {
//         if (err) {
//             console.error('Error connecting to MySQL:', err);
//             return res.status(500).json({ error: 'Failed to connect to database' });
//         }

//         // MySQLにデータを挿入
//         const sql = 'INSERT INTO mst_user (user_name, password, family_name, first_name, post_code, prefecture, municipalities, street_address, apartment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//         const values = [formData.user_name, formData.password, formData.family_name, formData.first_name, formData.post_code, formData.prefecture, formData.municipalities, formData.street_address, formData.apartment];

//         connection.query(sql, values, (err, result) => {
//             if (err) {
//                 console.error('Error registering user:', err);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//             console.log('会員登録が成功しました!');
//             res.status(200).json({ message: '会員登録が成功しました!' });

//             // MySQL接続を閉じる
//             connection.end();
//         });
//     });
// }

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // 許可されていないメソッドの場合は405エラーを返す
    }

    const formData = req.body;

    try {
        const connection = await pool.getConnection();

        const sql = 'INSERT INTO mst_user (user_name, password, family_name, first_name, post_code, prefecture, municipalities, street_address, apartment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const hashedPassword = await bcrypt.hash(formData.password, 10); // パスワードをハッシュ化して保存
        const values = [
                formData.user_name,
                hashedPassword,
                formData.family_name,
                formData.first_name,
                formData.post_code,
                formData.prefecture,
                formData.municipalities,
                formData.street_address,
                formData.apartment
            ];

            // クエリを実行
            const result = await connection.execute(sql, values);

            connection.release(); // コネクションを解放

            console.log('会員登録が成功しました!');
            res.status(200).json({ message: '会員登録が成功しました!' });
    } catch (err) {
        console.error("MySQLデータ取得エラー", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}