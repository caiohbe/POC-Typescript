import express from "express";
var server = express();
server.get("/health", function (req, res) {
    res.send("OK");
});
server.listen(4000, function () {
    console.log("Aplicação em execução");
});
