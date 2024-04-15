/* 会員登録用API(ハッシュ化したパスワードをDBに保存する) */
import pool from './db.connection';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // 許可されていないメソッドの場合は405エラーを返す
    }

    const formData = req.body;

    try {
        const connection = await pool.getConnection();

        const sql = 'INSERT INTO mst_user (user_name, password, family_name, first_name, post_code, prefecture, municipalities, street_address, apartment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
                formData.user_name,
                formData.password,
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

            console.log('会員登録が成功しました。');
            res.status(200).json({ message: '会員登録が成功しました。' });

    } catch (err) {
        console.error("MySQLデータ取得エラー", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}