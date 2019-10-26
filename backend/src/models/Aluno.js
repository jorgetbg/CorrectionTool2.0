const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  email: String,
  password: String,
  nome: String
});

module.exports = mongoose.model('Aluno', alunoSchema);