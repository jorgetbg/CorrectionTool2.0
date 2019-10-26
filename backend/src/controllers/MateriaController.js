const Materia = require('../models/Materia');
const Professor = require('../models/Professor');

module.exports = {
  async novaMateria(req, res){
    const {userId, nome, password } = req.body

    let professor = await Professor.findById(userId);
    if(!professor) res.sendStatus(400);

    Materia.create({
      password,
      nome,
      professor: userId
    })
    res.sendStatus(200)
  }
};
