const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
  nome: String,
  password: String,
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno'
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  },
});

module.exports = mongoose.model('Matricula', matriculaSchema);