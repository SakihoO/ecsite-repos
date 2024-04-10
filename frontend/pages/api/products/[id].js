// 商品詳細ページ用APIエンドポイント
import pool from "../db.connection";
import { createRouter } from "next-connect";

// ハンドラ関数をデフォルトエクスポート
export default async function handler(req, res) {
    try {
        // リクエストのクエリパラメータからidを取得
        const { query: { id } } = req;
        // idを整数に変換する
        const productId = parseInt(id, 10);

        // 商品idがNaNの場合、Invalid IDと見なして400エラーを返す
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        // データベースから商品情報を取得するためのSQLクエリを定義
        const productQuery = `
            SELECT p.*, c.category_name, c.category_sub_name
            FROM mst_product p
            JOIN mst_category c ON p.category_id = c.id
            WHERE p.id = ?`;

        // プールから接続を取得
        const connection = await pool.getConnection();

        try {
            // クエリを実行して結果を取得
            const [results, fields] = await connection.query(productQuery, [productId]);

            // 商品が見つからない場合、404エラーを返す
            if (results.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // 取得した商品情報をJSON形式でクライアントに返す
            res.json(results[0]);
        } catch (error) {
            console.error("クエリ実行エラー", error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            // 接続を解放
            connection.release();
        }
    } catch (err) {
        console.error("データ取得エラー", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}// handler関数をGETリクエストに関連付けたNext.jsのルーターを作成する
const router = createRouter().get(handler);