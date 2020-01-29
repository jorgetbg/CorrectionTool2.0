const Materia = require("../models/Materia");
const Matricula = require("../models/Matricula");
const Professor = require("../models/Professor");

module.exports = {
  async store(req, res) {
    const { userId, nome, password } = req.body;

    if (!userId || !nome || !password)
      return res
        .status(400)
        .send({
          status: "error",
          message: "Informações inválidas.",
          data: null
        });

    //Middleware garante que o usuario é professor e com token valido (passado pelo servidor)

    let materia;
    try {
      materia = await Materia.create({
        password,
        nome,
        professor: userId
      });
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }

    return res
      .status(200)
      .send({
        status: "success",
        message: "Matéria cadastrada!!!",
        data: { materia: materia.nome }
      });
  },

  async index(req, res) {
    const pagina =
      req.query.page !== undefined && req.query.page <= 0 ? 1 : req.query.page;
    const itensPorPagina = 10;
    let materias;
    if (req.body.role == "professor")
      materias = await Materia.find({ professor: req.body.userId })
        .limit(itensPorPagina)
        .skip(itensPorPagina * (pagina - 1))
        .populate("professor", "nome");
    else
      materias = await Materia.find()
        .limit(itensPorPagina)
        .skip(itensPorPagina * (pagina - 1))
        .populate("professor", "nome"); //populate esta causando +150ms

    materias = materias.map(materia => {
      let m = {
        _id: materia._id,
        nome: materia.nome,
        professor: materia.professor.nome,
        capacidade: materia.capacidade,
        lotacao: materia.lotacao,
        status: true
      };
      return m
    });

    return res
      .status(200)
      .send({
        status: "success",
        message: "Matérias encontradas!!!",
        data: materias
      });
  },
  async obterAlunosMatriculados(req, res) {
    const { userId } = req.body;
    const { materiaId } = req.params;

    let matriculas;
    let materia;
    try {
      if (!materiaId) throw "Informações inválidas.";
      materia = await Materia.findById(materiaId);
      if (!materia) throw "Materia não existe.";
      if (materia.professor != userId)
        throw "Materia não pertence a este professor";

      matriculas = await Matricula.find({ materia: materiaId }).populate(
        "aluno"
      );
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null });
    }

    let alunosMatriculados = matriculas.map(matricula => {
      return {
        _id: matricula.aluno._id,
        nome: matricula.aluno.nome
      };
    });

    return res
      .status(200)
      .send({
        status: "success",
        message: "Alunos obtidos com sucesso!!!",
        data: { alunos: alunosMatriculados }
      });
  }
};
