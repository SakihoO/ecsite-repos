/* 会員登録用API */
import mysql from 'mysql';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // メソッドがPOSTでない場合はエラーを返す
    }
    // リクエストからデータを取得
    // const { user_name, password, family_name, first_name, post_code, prefecture, municipalities, street_address, apartment	} = req.body;
    const formData = req.body;

    // MySQL接続設定
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'sakihookamoto',
        password: 'int01',
        database: 'repos_db',
        port: '3306'
    });

    // MySQL接続
    connection.connect();

    // MySQLにデータを挿入
    const sql = 'INSERT INTO mst_user (user_name, password, family_name, first_name, post_code, prefecture, municipalities, street_address, apartment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.user_name, formData.password, formData.family_name, formData.first_name, formData.post_code, formData.prefecture, formData.municipalities, formData.street_address, formData.apartment];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('会員登録が成功しました!');
            res.status(200).json({ message: '会員登録が成功しました!' });
    });

    // MySQL接続終了
    connection.end();
}