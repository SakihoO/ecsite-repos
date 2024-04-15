## ECSite Repos.

ECSite repos is a shopping site for interior products.<br/>

## Getting Stared
### Run on a docker container
```zsh
# Dockerコンテナ ビルド+起動
# ローカル開発環境
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
# 本番環境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## Migrations commands
```bash
cd api
docker exec -it api_container sh
npx sequelize-cli db:migrate
```
## Seed commands
```bash
cd api
docker exec -it api_container sh
npx sequelize-cli db:seed:all
```



## 使用技術
- Express 4.18.2
- mysql2 3.7.0
- sequelize 6.35.2
- Node.js 18.17.0

### Author
- 作成者 - Sakiho Okamoto
- 所属 - システム開発事業部