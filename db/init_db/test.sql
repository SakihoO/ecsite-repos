DROP DATABASE IF EXISTS test_db;
CREATE DATABASE test_db;

USE test_db;

DROP TABLE IF EXISTS test;

CREATE TABLE test (
  id INT NOT NULL,
  name VARCHAR(30),
  description VARCHAR(255)
);

INSERT INTO test (id, name, description) VALUES (1, 'test1', 'テストデータ1です。');
INSERT INTO test (id, name, description) VALUES (2, 'test2', 'テストデータ2です。');
INSERT INTO test (id, name, description) VALUES (3, 'test3', 'テストデータ3です。');
INSERT INTO test (id, name, description) VALUES (4, 'test4', 'テストデータ4です。');
INSERT INTO test (id, name, description) VALUES (5, 'test5', 'テストデータ5です。');