const Materia = require("../models/Materia");
const Exercicio = require("../models/Exercicio");
const Professor = require("../models/Professor");

module.exports = {
  async store(req, res) {
    const { materiaId, descricao, prazo, nota, userId } = req.body;

    let materia, exercicio;
    if (!materiaId || !descricao || !prazo || !nota)
      return res.status(400).send({ error: "Informações inválidas.." });

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
    return res.status(200).send({ exercicio: exercicio._id });
  }
};
