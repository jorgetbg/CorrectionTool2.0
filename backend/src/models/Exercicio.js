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
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: true
  }
});

module.exports = mongoose.model('Exercicio', exercicioSchema);