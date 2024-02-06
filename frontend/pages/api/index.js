import connection from '../../../api/mysql/connection';
import { createRouter } from 'next-connect';

const router = createRouter();

router.get(async (req, res) => {
  try {
    // クエリパラメータからcategory_idを取得
    const categoryId = req.query.category_id;

    // category_idが指定されている場合は、その条件を追加してクエリを実行
    const query = categoryId ?
        `SELECT id, product_name, price, img_full_path FROM \`mst_product\` WHERE category_id = ${categoryId}` :
        `SELECT id, product_name, price, img_full_path FROM \`mst_product\``;

    // connection.promise().queryを使用して、MySQLデータベースからmst_productテーブルのすべてのデータを取得する
    const [results, fields] = await connection.promise().query(query);

    // 取得したデータを返す
    res.json(results);
  } catch (err) {
    console.log("接続終了(異常)", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log("接続終了(正常)");
});

export default router.handler();