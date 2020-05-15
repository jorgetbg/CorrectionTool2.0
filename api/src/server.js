require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors')

var cookieParser = require('cookie-parser')



const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("Conectado ao banco de dados.")).catch(err => console.error(err))


// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN_URI
}))
app.use(cookieParser())
app.use(express.json());
app.use(routes);

console.log("Porta 3333 pronta!")
server.listen(3333);
