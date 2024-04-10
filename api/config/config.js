module.exports = {
    'dialect': 'mysql',
    'port': process.env.NEXT_PUBLIC_PORT,
    'host': process.env.NEXT_PUBLIC_MYSQL_HOST,
    'database': process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    'username': process.env.NEXT_PUBLIC_MYSQL_USERNAME,
    'password': process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    'timezone': '+09:00',
    'benchmark': true,
    'logging': false,
};