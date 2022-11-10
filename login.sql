-- CREATE DATABASE kdt DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

USE kdt;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userid VARCHAR(20) NOT NULL,
  name VARCHAR(10) NOT NULL,
  pw VARCHAR(20) NOT NULL
);

INSERT INTO users (userid, name, pw) VALUES ("banana", "바나", "apple");
INSERT INTO visitor (name, comment) VALUES ("홍길동", "내가 왔다");
