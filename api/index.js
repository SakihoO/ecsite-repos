const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.listen(3000, console.log("server started"));

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'mysql_container',  // コンテナ名を指定する
  user: 'root',
  password: 'int20051220',
  database: 'test_db'
});
con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

app.get("/api/getAll", (req, res) => {
    const sql = `
      SELECT
          name
        , description
      FROM
          test 
      ORDER BY
          id DESC;
    `;
    con.query(sql, (err, results) => { 
      if (err) throw err;
      res.json(results);
    });
});