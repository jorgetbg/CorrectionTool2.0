require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})






// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

//app.use(cors());
app.use(express.json());
app.use(routes);

console.log("Porta 3333 pronta!")
server.listen(3333);
