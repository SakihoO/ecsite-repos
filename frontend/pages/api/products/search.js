/* 商品検索用APIエンドポイント */
import pool from '../db.connection.js';

export default async function handler(req, res) {
    try {
        // リクエストから検索キーワードを取得
        const searchTerm = req.query.search;

        const connection = await pool.getConnection();

        try {
            // SQLクエリを部分一致検索を行うように修正
            const query = `SELECT * FROM mst_product WHERE product_name LIKE '%${searchTerm}%'`;

            const [results, fields] = await connection.query(query);

            res.json(results);
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log("接続終了サーチ(異常)", err);
        res.status(500).json({ error: 'Internal Server Error Search' });
    }
}