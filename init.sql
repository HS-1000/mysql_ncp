-- CREATE DATABASE kdt DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;


USE kdt;

CREATE TABLE visitor (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10) NOT NULL,
  comment MEDIUMTEXT 
);

INSERT INTO visitor (name, comment) VALUES ("홍길동", "내가 왔다");
INSERT INTO visitor (name, comment) VALUES ("이찬혁", "으라차차");

-- CREATE USER 'user1'@'%' IDENTIFIED BY '$user1*';
-- GRANT ALL PRIVILEGES ON *.* TO 'user1'@'%' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;
-- >>> 사용할 새로운 유저 만들기

-- ALTER USER 'user1'@'%' IDENTIFIED WITH mysql_native_password BY 'newPassWord';
-- >>> user1 의 비밀번호 변경

-- DELETE FROM visitor WHERE id = num;
-- >>> record 삭제