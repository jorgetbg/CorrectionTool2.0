const Matricula = require('../models/Matricula');
const Materia = require('../models/Materia');
const Aluno = require('../models/Aluno');

module.exports = {
  async store(req, res) {
    const { userId, materiaId, password } = req.body

    if (!userId || !materiaId || !password)
      return res.status(400).send({ status: "error", message: "Informações inválidas.", data: null })

    let materia
    try {
      materia = await Materia.findById(materiaId);
      if (!materia)
        throw "Matéria inexistente"
      if (password != materia.password)
        throw "Senha incorreta"
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null })
    }


    let matricula
    try {
      matricula = await Matricula.findOne({ "aluno": userId, "materia": materiaId })
      if (matricula)
        throw "Aluno já matriculado nessa matéria."
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null })
    }

    try {
      matricula = await Matricula.create({
        aluno: userId,
        materia: materiaId
      })
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null })
    }
    return res.status(200).send({ status: "success", message: "Matricula criada!!!", data: { "matricula": matricula._id } })
  },

  async obterMatriculasAluno(req, res) {
    const pagina = (req.query.page !== undefined && req.query.page <= 0) ? 1 : req.query.page
    const itensPorPagina = 10
    let matriculas
    try{
      matriculas = await Matricula.find({aluno:req.body.userId}).limit(itensPorPagina).skip(itensPorPagina * (pagina - 1)).populate('materia', 'nome') //populate esta causando +150ms
    }catch(e){
      return res.status(400).send({ status: "error", message: e, data: null })
    }


    matriculas = matriculas.map(matricula => {
      return {
        materia: matricula.materia.nome
      }
    })
    return res.status(200).send({ status: "success", message: "Matriculas obtidas com sucesso!!!", data: {matriculas}})
  }
};
