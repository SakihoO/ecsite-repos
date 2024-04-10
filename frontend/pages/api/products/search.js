/* 商品検索用APIエンドポイント */

// import connection from "../../../../api/mysql/connection";
import { createRouter } from "next-connect";
import connection from '../db.connection.js';

const router = createRouter();

router.get(async (req, res) => {
    try {
        // リクエストから検索キーワードを取得
        const searchTerm = req.query.search;

        // SQLクエリを部分一致検索を行うように修正
        const query = `SELECT * FROM mst_product WHERE product_name LIKE '%${searchTerm}%'`;

        const [results, fields] = await connection.promise().query(query);

        res.json(results);
    } catch (err){
        console.log("接続終了サーチ(異常)", err);
        res.status(500).json({ error: 'Internal Server Error Search' });
    }
    console.log("接続終了サーチ(正常)");
})

export default router.handler();