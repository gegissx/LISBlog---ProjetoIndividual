var postagemModel = require("../models/postagemModel");

function listar(req, res) {
    postagemModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os postagems: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    postagemModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os postagens: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarMemorias(req, res) {
    var idUsuario = req.params.idUsuario;

    postagemModel.listarMemorias(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhuma memória encontrada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as memórias: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var post = req.body.post;
    var foto = null;
    var importante = req.body.importante;
    var sentimento = req.body.sentimento;
    var idUsuario = req.params.idUsuario;

    if (req.file){ foto = `'${req.file.filename}'`}

    if (post == undefined) {
        res.status(400).send("O post está indefinido!");
    } else if (sentimento == undefined) {
        res.status(400).send("O sentimento está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        postagemModel.publicar(post, foto, importante, sentimento, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
// function editar(req, res) {
//     var novaDescricao = req.body.descricao;
//     var idpostagem = req.params.idpostagem;

//     postagemModel.editar(novaDescricao, idpostagem)
//         .then(
//             function (resultado) {
//                 res.json(resultado);
//             }
//         )
//         .catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );

// }

function deletar(req, res) {
    var idpostagem = req.params.idpostagem;

    postagemModel.deletar(idpostagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function curtir(req, res) {
    var idPostagem = req.params.idPostagem;
    var idUsuario = req.params.idUsuario;

    postagemModel.verificarCurtida(idUsuario, idPostagem)
        .then(
            function (resultado) {

                if (resultado.length > 0){
                    postagemModel.descurtir(idUsuario, idPostagem)
                    .then(function () {
                        res.status(200).json({ curtido: false});
                    })
                    .catch(function(erro){
                        console.log(erro);
                        console.log("Houver um erro ao descurtir o post: ", erro.sqlMessage)
                        res.status(500).json(erro.sqlMessage)
                    })
                } else {
                    postagemModel.curtir(idUsuario, idPostagem)
                    .then(function () {
                        res.status(200).json({curtido: true});
                    })
                    .catch(function (erro){
                        console.log(erro);
                        console.log("Houve um erro ao curtir o post: ", erro.sqlMessage)
                        res.status(500).json(erro.sqlMessage)
                    })
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Erro na função de curtir postagem: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function verificarCurtida(req, res) {
    var idUsuario = req.params.idUsuario;
    var idPostagem = req.params.idPostagem;

    postagemModel.verificarCurtida(idUsuario, idPostagem)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ curtido: true, idPostagem: idPostagem });
            } else {
                res.status(200).json({ curtido: false, idPostagem: idPostagem });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    listarPorUsuario,
    listarMemorias,
    publicar,
    deletar,
    curtir,
    verificarCurtida
}