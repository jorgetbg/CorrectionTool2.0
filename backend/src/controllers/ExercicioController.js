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
        materia: materiaId
      });
    } catch (e) {
      return res.status(401).send({ status: "error", message: e, data: null });
    }
    return res.status(200).send({ status: "success", message: "Exercício cadastrado!!!", data: {exercicio: exercicio._id } })
  },

  async getExerciciosMateria(req, res){
    const { materiaId, userId, role } = req.body;
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
