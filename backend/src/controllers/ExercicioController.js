const Materia = require("../models/Materia");
const Exercicio = require("../models/Exercicio");
const Matricula = require("../models/Matricula");

module.exports = {
  async store(req, res) {
    const { materiaId, descricao, prazo, nota, userId } = req.body;

    let materia, exercicio;

    try {
      if (!materiaId || !descricao || !prazo || !nota)
        throw "Informações inválidas..";

      materia = await Materia.findById(materiaId);
      if (!materia) throw "Matéria inexistente.";
      if (materia.professor != userId)
        throw "Esta matéria não pertence a esse usuário.";

      exercicio = await Exercicio.create({
        descricao,
        prazo,
        nota,
        status: "pendente",
        materia: materiaId
      })
      exercicio = await exercicio.populate("materia", "nome").execPopulate()
      console.log(exercicio)
    } catch (e) {
      return res.status(401).send({ status: "error", message: e, data: null });
    }
    return res.status(200).send({ status: "success", message: "Exercício cadastrado!!!", data: {exercicio } })
  },

  async exercicioShow(req, res){
    const {exercicioId} = req.params

    let exercicio
    try{
      if(!exercicioId) throw "Informações inválidas..";

      exercicio = await Exercicio.findById(exercicioId).populate("materia", "nome")
      if(!exercicio) throw "Exercício inexistente."

      return res.status(200).send({ status: "success", message: "Exercício encontrado!!!", data: {exercicio} })
    }catch(e){
      return res.status(401).send({ status: "error", message: e, data: null });
    }
  },
  async getExerciciosProfessor(req, res){
    const {  userId  } = req.body;

    let exercicios
    try{
      
      var id = require('mongodb').ObjectID(userId);

      exercicios = await Exercicio.aggregate([{
        $lookup: {
          "from": "materias",
          "localField": "materia",
          "foreignField": "_id",
          "as": "materia"
        }}, //Mesmo que o populate(materia)
        {"$unwind": "$materia"}, //Tira matéria do array
        {$match: { "materia.professor": id }}, //Exercicio pertente a matéria do professor
        {$project: {_id: 1, status: 1, descricao: 1, prazo: 1, nota: 1, submissoesCount:1, "materia.nome": 1}} //Filtra apenas campos relevantes
      ])
      /*
      exercicios = await Exercicio.aggregate( [ { $group : { 
        _id : "$materia",
        nome: {$first: "$lookup"}
        }} 
      ])*/

      return res.status(200).send({ status: "success", message: "Exercícios encontrados!!!", data: {exercicios} })
    }catch(e){
      return res.status(401).send({ status: "error", message: e, data: null });
    }
  },
  async getExerciciosMateria(req, res){
    const {  userId, role } = req.body;
    const materiaId = req.params.materiaId;

    let materia, exercicios, matricula
    try{
      if (!materiaId) throw "Informações inválidas..";
      materia = await Materia.findById(materiaId);
      if (!materia) throw "Matéria inexistente.";
      if(role == "professor")
        if(materia.professor != userId) throw "Esta matéria não pertence a esse usuário.";
      
      if(role == "aluno"){
        matricula = await Matricula.findOne({aluno:userId, materia:materiaId})
        if(!matricula)  throw "Usuário não esta matriculado nessa matéria.";
      }
      exercicios = await Exercicio.find({materia:materiaId})
      return res.status(200).send({ status: "success", message: "Exercícios encontrados!!!", data: {exercicios} })
        
    }catch(e){
      return res.status(401).send({ status: "error", message: e, data: null });
    }

  }
};
