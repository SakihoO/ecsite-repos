/* MySQL接続情報 */
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    port: parseInt(process.env.NEXT_PUBLIC_PORT),
    connectionLimit: 10, // 接続プールの最大数
    waitForConnections: true // 接続が利用可能になるまで待機する
});

export default pool;