const Matricula = require('../models/Matricula');
const Materia = require('../models/Materia');
const Aluno = require('../models/Aluno');

module.exports = {
  async store(req, res) {
    const { userId, materiaId, password } = req.body

    if (!userId || !materiaId || !password)
      return res.status(400).send({ error: "Informações inválidas." })

    let materia = await Materia.findById(materiaId);
    if (!materia)
      return res.send({ error: "Matéria inexistente." }, 400);

    let aluno = await Aluno.findById(userId);
    if (!aluno)
      return res.send({ error: "Aluno inexistente." }, 400);


    if (password != materia.password)
      return res.send({ error: "Senha incorreta." }, 401);

    let matricula = await Matricula.findOne({ "aluno": userId })
    if (matricula)
      return res.status(400).send({ error: "Aluno já matriculado na matéria." })


    matricula = await Matricula.create({
      aluno: userId,
      materia: materiaId
    })
    return res.status(200).send({"matricula":matricula._id})
  },

  async index(req, res) {
    const pagina = (req.query.page !== undefined && req.query.page <= 0) ? 1 : req.query.page
    const itensPorPagina = 10
    let materias = await Materia.find().limit(itensPorPagina).skip(itensPorPagina * (pagina - 1)).populate('professor', 'nome') //populate esta causando +150ms


    materias = materias.map(materia => {
      return {
        nome: materia.nome,
        professor: materia.professor.nome
      }
    })

    return res.send(materias)
  }
};
