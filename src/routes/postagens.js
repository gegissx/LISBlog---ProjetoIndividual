var express = require("express");
var router = express.Router();

var postagemController = require("../controllers/postagemController");


// posts
router.get("/listar", function (req, res) {
    postagemController.listar(req, res);
});

// meus posts
router.get("/listar/:idUsuario", function (req, res) {
    postagemController.listarPorUsuario(req, res);
});

// memórias importantes
router.get("/memorias/:idUsuario", function (req, res) {
    postagemController.listarMemorias(req, res);
});

// publicar
router.post("/publicar/:idUsuario", function (req, res) {
    postagemController.publicar(req, res);
});

// router.put("/editar/:idAviso", function (req, res) {
//     postagemController.editar(req, res);
// });

// deletar
router.delete("/deletar/:idPostagem", function (req, res) {
    postagemController.deletar(req, res);
});

// curtir e descurtir
router.post("/curtir/:idUsuario/:idPostagem", function (req, res) {
    postagemController.curtir(req, res);
});


module.exports = router;