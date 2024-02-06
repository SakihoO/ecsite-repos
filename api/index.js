// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const port = 3000;

// const connection = mysql.createConnection({
//   host: 'mysql_container',
//   user: 'sakihookamoto',
//   password: 'int01',
//   database: 'repos_db'
// });

// app.get("/api", (req, res) => {
//   // DBに対してクエリを発行する
//   connection.query(
//     'SELECT * FROM `mst_product`',
//     function(err, results, fields) {
//       if(err) {
//         console.log("接続終了(異常)");
//         throw err;
//       }
//       res.json({message: results[0].product_name});
//     }
//   );
//   console.log("接続終了(正常)");
// });

// app.listen(port, () => {
//   console.log(`listening on *:${port}`);
// });

// export default app;

// const cors = require('cors');
// app.use(cors());

// app.listen(3000, console.log("server started"));



// con.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected');
// });

// app.get("/api/getAll", (req, res) => {
//     const sql = `
//       SELECT
//           name
//         , description
//       FROM
//           test
//       ORDER BY
//           id DESC;
//     `;
//     con.query(sql, (err, results) => {
//       if (err) throw err;
//       res.json(results);
//     });
// });