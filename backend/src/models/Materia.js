const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nome: String,
  password: String,
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  },
});

module.exports = mongoose.model('Materia', materiaSchema);