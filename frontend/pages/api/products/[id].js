import connection from "../../../../api/mysql/connection";
import { createRouter } from "next-connect";

const handler = async (req, res) => {
    try {
        // リクエストのクエリパラメータからidを取得(抽出)する
        const { query: { id } } = req;
        // idを整数に変換する
        const productId = parseInt(id, 10);

        // 商品id（productId）がNaNの場合、はInvalid ID（＝無効なID）と見なし、404エラーを返す
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        // データベースからmst_productの情報を取得するためのSQLクエリを定義
        const query = `
            SELECT p.*, c.category_name, category_sub_name
            FROM mst_product p
            JOIN mst_category c ON p.category_id = c.id
            WHERE p.id = ?`;
        // DBから商品情報を取得する
        const [results, fields] = await connection.promise().query(query, [productId]);

        // 商品が見つからない場合、404エラーを返す
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // 取得した商品情報をJSON形式でクライアントに返す
        res.json(results[0]);
    } catch (err) {
        console.error("データ取得エラー", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// handler関数をGETリクエストに関連付けたNext.jsのルーターを作成する
const router = createRouter().get(handler);

export default handler;