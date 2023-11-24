// Expressフレームワークを読み込む
const express = require('express');
const app = express();

// require('');の中身を、mysqlからmysql2に変更
const mysql =require('mysql2');

app.get('/', (req, res) => res.send('Hello World!'));

// ポート3000をオープンにする
app.listen(3000);