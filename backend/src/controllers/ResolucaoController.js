const Resolucao = require("../models/Resolucao");
const Exercicio = require("../models/Exercicio");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { userId, exercicioId } = req.body;

    let resolucao, exercicio, prazoDiff, prazoString;
    try {
      exercicio = await Exercicio.findById(exercicioId);
      if (!exercicio) throw "Exercício inexistente.";

      prazoDiff = Date.now() - exercicio.prazo;
      if (prazoDiff > 0) throw "Submissão atrasada.";

      resolucao = await Resolucao.findOne({
        aluno: userId,
        exercicio: exercicioId
      });
      let filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        resolucao.resolucaoFilename
      );
      if (resolucao) {
        if(fs.existsSync(filePath))
            fs.unlinkSync(filePath);
        resolucao.resolucaoFilename = filename;
        resolucao.tentativas++;
        resolucao.dataSubmissao = new Date().toISOString();
        await resolucao.save();
      } else {
        resolucao = await Resolucao.create({
          exercicio: exercicioId,
          aluno: userId,
          resolucaoFilename: filename,
          dataSubmissao: new Date().toISOString()
        });
      }
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }

    return res.status(200).send({
      status: "success",
      message: "Exercício submetido!!!",
      data: {
        resolucao: resolucao._id,
        tentativas: resolucao.tentativas,
        horarioSubmissao: resolucao.dataSubmissao,
        entrega: prazoString
      }
    });
  },
  async obterResolucoesDeExercicio(req, res) {
    const { exercicioId } = req.params;
    const { userId } = req.body;
    let exercicio, resolucoes;
    try {
      exercicio = await Exercicio.findById(exercicioId).populate(
        "materia",
        "professor"
      );
      if (exercicio.materia.professor != userId)
        throw "Materia não pertence a este professor";
      if (!exercicio) throw "Exercício inexistente.";
      resolucoes = await Resolucao.find(
        { exercicio: exercicioId },
        "aluno resolucaoFilename tentativas dataSubmissao"
      ).populate("aluno", "email nome");
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }
    return res.status(200).send({
      status: "success",
      message: "Submissões obtidas!!!",
      data: { resolucoes }
    });
  },
  async obterResolucaoDeExercicio(req, res) {
    const { exercicioId } = req.params;
    const { userId } = req.body;
    let exercicio, resolucao;
    try {
      //exercicio = await Exercicio.findById(exercicioId).populate("materia", "professor");
      //   if(exercicio.materia.professor != userId) throw "Materia não pertence a este professor";
      //   if (!exercicio) throw "Exercício inexistente.";
      resolucao = await Resolucao.findOne(
        { exercicio: exercicioId, aluno: userId },
        "exercicio resolucaoFilename tentativas dataSubmissão"
      );
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }
    return res.status(200).send({
      status: "success",
      message: "Submissões obtidas!!!",
      data: { resolucao }
    });
  }
};
