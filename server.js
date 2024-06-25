import express from "express";
const app = express();

var port = process.env.PORT || 3000

app.get('/', function(req, res) {
    res.json ({ mensaje: 'Hello World!'})
})

app.get('/productList', function(req, res) {
    res.json({ mensaje: 'Base de datos'})
})

app.post('/', function(req, res) {
    res.json({ mensaje: 'post'})
})

app.delete('/', function(req, res) {
    res.json({ mensaje: 'delete'})
})

app.listen(port)
console.log('API escuchando en el puerto ' + port)