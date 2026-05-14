CREATE DATABASE LisBlog;
USE LisBlog;

CREATE TABLE usuarios (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100) NOT NULL,
senha VARCHAR(45) NOT NULL,
nickname VARCHAR(45)
);

select * from usuarios;
