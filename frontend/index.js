// Expressフレームワークを読み込む
const express = require('express');
const app = express();

// require('');の中身を、mysqlからmysql2に変更
// const mysql =require('mysql2');

// // ホームページに対してGETリクエストが行われた時に「Hello World!」で応答する
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// ポート3000をオープンにする
app.listen(3000);