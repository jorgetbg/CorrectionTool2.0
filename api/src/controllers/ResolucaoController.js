const Resolucao = require("../models/Resolucao");
const Exercicio = require("../models/Exercicio");
const FileUploadController = require("./FileUploadController");
const DockerController = require("../controllers/DockerController")
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { userId, exercicioId } = req.body;

    let resolucao, exercicio, prazoDiff, prazoString;
    try {
      if (!req.file) throw "É necessario fazer o upload de um arquivo.";
      const { filename, originalname } = req.file;
      exercicio = await Exercicio.findById(exercicioId);
      if (!exercicio) throw "Exercício inexistente.";

      prazoDiff = Date.now() - exercicio.prazo;
      if (prazoDiff > 0) throw "Submissão atrasada.";

      resolucao = await Resolucao.findOne({
        aluno: userId,
        exercicio: exercicioId
      });

      let tempPath, definitivoPath;
      tempPath = path.resolve(req.file.destination, filename);
      definitivoPath = FileUploadController.gerarDiretorio(
        exercicio.materia,
        exercicio._id,
        userId
      );
      if (resolucao) {
        resolucao.tentativas++;
        resolucao.dataSubmissao = Date.now();
        resolucao.resolucaoFilename = originalname;

        await resolucao.save();
        console.log(resolucao)
      } else {
        resolucao = await Resolucao.create({
          exercicio: exercicioId,
          aluno: userId,
          resolucaoFilename: originalname,
          dataSubmissao:  Date.now()
        });
        exercicio.submissoesCount++;
        await exercicio.save()
      }
      FileUploadController.rename(tempPath, definitivoPath, originalname);
      corrigirResolucao(resolucao)
    } catch (e) {
      if (req.file)
        fs.unlink(req.file.path, e => {
          console.log(e);
        });
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
        "aluno resolucaoFilename tentativas dataSubmissao status"
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
    let resolucao;
    try {
      resolucao = await Resolucao.findOne(
        { exercicio: exercicioId, aluno: userId },
        "exercicio resolucaoFilename tentativas dataSubmissao status"
      );
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }
    return res.status(200).send({
      status: "success",
      message: "Submissões obtidas!!!",
      data: { resolucao }
    });
  },
  async download(req, res) {
    const { resolucaoId } = req.params;
    const { userId, role } = req.body;
    let resolucao, file, filePath;
    try {
      resolucao = await Resolucao.findById(resolucaoId)
        .populate({path:'exercicio', populate: {path: "materia", select: "professor" }})
      if (!resolucao) throw "Resolução Inexistente.";
      console.log(resolucao)
      if (role == "aluno") {
        if (userId != resolucao.aluno)
          throw "Resolução não pertence a esse aluno.";
      } else {
        if (userId != resolucao.exercicio.materia.professor)
          throw "Resolução não pertence a um exercício desse professor.";
      }

      filePath = FileUploadController.gerarDiretorio(
        resolucao.exercicio.materia._id,
        resolucao.exercicio._id,
        resolucao.aluno
        );
      console.log(filePath)
      filePath = path.resolve(filePath, resolucao.resolucaoFilename)
      console.log(filePath)
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }
    res.download(filePath, resolucao.resolucaoFilename)
  }
};

async function corrigirResolucao(resolucao){
  DockerController.corrigirResolucao(resolucao)
}
