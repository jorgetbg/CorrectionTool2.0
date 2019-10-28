const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nome: {
  type: String,
  trim: true,
  required: true
 },
  password: {
  type: String,
  trim: true,
  required: true
 },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },
});

module.exports = mongoose.model('Materia', materiaSchema);