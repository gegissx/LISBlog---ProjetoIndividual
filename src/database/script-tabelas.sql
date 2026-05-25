CREATE DATABASE LisBlog;
USE LisBlog;

CREATE TABLE usuarios (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL,
nickname VARCHAR(45) UNIQUE,
foto VARCHAR(150)
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
CONSTRAINT contFkUsuario FOREIGN KEY (fkUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE comentario (
idComentario INT PRIMARY KEY AUTO_INCREMENT,	
comentario VARCHAR(500) NOT NULL,
dtComentario DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
CONSTRAINT constFkUsuario2 FOREIGN KEY (fkUsuario) REFERENCES usuarios(idUsuario),
fkPostagem INT,
CONSTRAINT constFkPostagem FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem)
);

CREATE TABLE curtidas (
idCurtida INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT,
CONSTRAINT constFkUsuario3 FOREIGN KEY (fkUsuario) REFERENCES usuarios(idUsuario),
fkPostagem INT,
CONSTRAINT constFkPostagem2 FOREIGN KEY (fkPostagem) REFERENCES postagem(idPostagem)
);

SELECT * FROM usuarios;
SELECT * FROM postagem;
SELECT * FROM comentario;
SELECT * FROM curtidas;

CREATE VIEW viewPostagens AS
SELECT 
    p.idPostagem,
    p.post,
    p.foto AS fotoPost,
    p.importante,
    p.dtPostagem,
    p.sentimento,
    u.idUsuario,
    u.nome,
    u.nickname,
    u.foto AS fotoPerfil
FROM postagem p JOIN usuarios u
ON p.fkUsuario = u.idUsuario
ORDER BY p.dtPostagem DESC;

select * from viewPostagens;





