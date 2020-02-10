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
      materia.lotacao++;

      await materia.save()
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
      //matriculas = await Matricula.find({aluno:req.body.userId}, "materia").limit(itensPorPagina).skip(itensPorPagina * (pagina - 1)).populate('materia', "nome professor") //populate esta causando +150ms
      var id = require('mongodb').ObjectID(req.body.userId);
      matriculas = await Matricula.aggregate([
        {$match: {aluno: id}},
        {$limit: itensPorPagina},
        {$skip: itensPorPagina * (pagina - 1)},
        {$lookup: {
          "from": "materias",
          "localField": "materia",
          "foreignField": "_id",
          "as": "materia"
        }},
        {"$unwind": "$materia"},
        {$lookup: {
          "from": "professors",
          "localField": "materia.professor",
          "foreignField": "_id",
          "as": "materia.professor"
        }},
        {"$unwind": "$materia.professor"},
        {$lookup: {
          "from": "exercicios",
          "localField": "materia._id",
          "foreignField": "materia",
          "as": "exercicios"
        }},
        {$lookup: {
          "from": "resolucaos",
          "localField": "exercicios._id",
          "foreignField": "exercicio",
          "as": "resolucoes"
        }},
        {$set: {"exercicios": {$size:"$exercicios"}}},
        {$set: {"resolucoes": {$size:"$resolucoes"}}},
        {$project: {"materia.password": 0, "materia.capacidade": 0,"materia.lotacao": 0, "materia.__v": 0,"materia.professor.password": 0,"materia.professor.email": 0,"__v": 0, "aluno": 0}}
      ])
    }catch(e){
      return res.status(400).send({ status: "error", message: e, data: null })
    }

    return res.status(200).send({ status: "success", message: "Matriculas obtidas com sucesso!!!", data: {matriculas}})
  }
};
