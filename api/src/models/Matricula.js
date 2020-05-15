const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
    required: true
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: true
  },
});

module.exports = mongoose.model('Matricula', matriculaSchema);