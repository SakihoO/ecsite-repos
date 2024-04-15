const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, 'config', `.env.${process.env.APP_ENV || 'dev'}`);
console.log(envPath);
// dotenv で環境変数を読み込む
dotenv.config({ path: envPath });
