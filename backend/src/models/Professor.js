const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  email: String,
  password: String,
  nome: String
});

module.exports = mongoose.model('Professor', professorSchema);