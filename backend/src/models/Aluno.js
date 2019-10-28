const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  email: {
  type: String,
  trim: true,
  required: true
 },
  password: {
  type: String,
  trim: true,
  required: true
 },
  nome: {
  type: String,
  trim: true,
  required: true
 }
});

module.exports = mongoose.model('Aluno', alunoSchema);