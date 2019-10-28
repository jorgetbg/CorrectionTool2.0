const Materia = require('../models/Materia');
const Professor = require('../models/Professor');

module.exports = {
  async store(req, res) {
    const { userId, nome, password } = req.body

    if (!userId || !nome || !password)
      return res.status(400).send({ status: "error", message: "Informações inválidas.", data: null })

    //Middleware garante que o usuario é professor e com token valido (passado pelo servidor)

    let materia
    try {
      materia = await Materia.create({
        password,
        nome,
        professor: userId
      })
    } catch (e) {
      return res.status(400).send({ status: "error", message: e, data: null })
    }

    return res.status(200).send({ status: "success", message: "Matéria cadastrada!!!", data: { materia: materia.nome } })
  },

  async index(req, res) {
    const pagina = (req.query.page !== undefined && req.query.page <= 0) ? 1 : req.query.page
    const itensPorPagina = 10
    let materias
    if(req.body.role == "professor")
      materias = await Materia.find({professor: req.body.userId}).limit(itensPorPagina).skip(itensPorPagina * (pagina - 1)).populate('professor', 'nome')
    
    else
      materias = await Materia.find().limit(itensPorPagina).skip(itensPorPagina * (pagina - 1)).populate('professor', 'nome') //populate esta causando +150ms



    materias = materias.map(materia => {
      return {
        _id: materia._id,
        nome: materia.nome,
        professor: materia.professor.nome
      }
    })

    return res.status(200).send({ status: "success", message: "Matérias encontradas!!!", data: materias })
  }
};
