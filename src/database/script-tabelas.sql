CREATE DATABASE LisBlog;
USE LisBlog;

CREATE TABLE usuarios(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL
);

CREATE TABLE perfil (
idPerfil INT PRIMARY KEY AUTO_INCREMENT,
nickname VARCHAR(45) UNIQUE,
foto VARCHAR(150),
fkUsuario INT UNIQUE,
CONSTRAINT constFkUsuario FOREIGN KEY (fkUsuario) REFERENCES usuarios(IdUsuario)
);

CREATE TABLE postagem (
idPostagem INT PRIMARY KEY AUTO_INCREMENT,
post VARCHAR(600) NOT NULL,
foto VARCHAR(150),
importante TINYINT,
dtPostagem DATETIME DEFAULT CURRENT_TIMESTAMP,
sentimento VARCHAR(20) NOT NULL,
CONSTRAINT constCheck CHECK(sentimento IN('Alegria','Alivio','Ansiedade','Culpa','Esperanca','Medo','Paz', 'Raiva', 'Tristeza')),
fkUsuario INT,
CONSTRAINT contFkUsuario2 FOREIGN KEY (fkUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE curtidas (
idCurtida INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT,
CONSTRAINT constFkUsuario3 FOREIGN KEY (fkUsuario) REFERENCES usuarios(idUsuario),
fkPostagem INT,
CONSTRAINT constFkPostagem FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem)
);



