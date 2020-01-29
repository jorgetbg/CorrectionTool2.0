const mongoose = require('mongoose');

const exercicioSchema = new mongoose.Schema({
  nota: {
    type: Number,
    trim: true,
    required: true
   },
  prazo: {
  type: String,
  trim: true,
  required: true
 },
  descricao: {
  type: String,
  trim: true,
  required: true
 },
 linguagem: {
  type: String,
  trim: true,
  required: false,
  default: "octave"
 },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: true
  },
  status: {
    type: String,
    required: false,
    default: "pendente"
  }
});

module.exports = mongoose.model('Exercicio', exercicioSchema);