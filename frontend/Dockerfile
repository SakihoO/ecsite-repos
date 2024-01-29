# FROM mysql/mysql-server:5.7.28
# ベースイメージの指定
FROM node:lts
ENV MYSQL_ROOT_PASSWORD=int20051220

#作業ディレクトリの指定
WORKDIR /usr/src/app

# コンテナの使用ポート指定
EXPOSE 3000
# コンテナが勝手に終了してしまわないようにする設定
ENV CI=true

# Reactの自動起動設定
CMD npm start