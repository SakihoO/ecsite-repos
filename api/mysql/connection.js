import { createConnection } from 'mysql2';

const connection = createConnection({
    host: 'localhost',
    user: 'sakihookamoto',
    password: 'int01',
    database: 'repos_db',
    port: '3306'
});

export default connection;