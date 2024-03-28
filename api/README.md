## ECSite Repos.

ECSite repos is a shopping site for interior products.<br/>

## Getting Stared
### Run on a docker container:
```zsh
# Dockerコンテナ ビルド
docker-compose build
# Dockerコンテナ 起動
docker-compose up -d
```

## Migrations commands
```bash
cd api

npx sequelize-cli db:migrate
```

## 使用技術
- Express 4.18.2
- mysql2 3.7.0
- sequelize 6.35.2
- Node.js 18.17.0

### Author
- 作成者 - Sakiho Okamoto
- 所属 - システム開発事業部