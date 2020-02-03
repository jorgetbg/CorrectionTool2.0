const mongoose = require('mongoose');
const md5 = require('md5')

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
 },
 gravatarUrl: {
   type: String,
   required: false,
   default: function(){
    return md5(this.email)
   }
 }
});

module.exports = mongoose.model('Aluno', alunoSchema);