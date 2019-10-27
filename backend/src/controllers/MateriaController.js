const Materia = require('../models/Materia');
const Professor = require('../models/Professor');

module.exports = {
  async store(req, res) {
    const { userId, nome, password } = req.body

    if (!userId || !nome || !password)
      return res.status(400).send({ error: "Informações inválidas." })

    let professor = await Professor.findById(userId);
    if (!professor) return res.send({ error: "Usuário inexistente." }, 400);

    Materia.create({
      password,
      nome,
      professor: userId
    })
    return res.sendStatus(200)
  },

  async index(req, res) {
    const pagina = (req.query.page !== undefined && req.query.page <= 0) ? 1 : req.query.page
    const itensPorPagina = 10
    let materias = await Materia.find().limit(itensPorPagina).skip(itensPorPagina * (pagina - 1)).populate('professor', 'nome') //populate esta causando +150ms


    
    materias = materias.map( materia =>{
      return {
        _id: materia._id, 
        nome: materia.nome,
        professor: materia.professor.nome
      }
    })
    
    return res.send(materias)
  }
};
