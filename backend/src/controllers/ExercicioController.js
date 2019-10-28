const Materia = require('../models/Materia');
const Exercicio = require('../models/Exercicio');
const Professor = require('../models/Professor');

module.exports = {
  async store(req, res) {
    const { materiaId, descricao, prazo, nota } = req.body

    if (!materiaId || !descricao || !prazo || !nota)
      return res.status(400).send({ error: "Informações inválidas.." })

    let materia = await Materia.findById(materiaId);
    if(!materia) return res.send({ error: "Matéria inexistente." }, 400);

    let userId = req.body.userId
    
    if(materia.professor != userId)
      return res.status(401).send({error:"Esta matéria não pertence a esse usuário."})

    exercicio = await Exercicio.create({
      descricao,
      prazo,
      nota,
      materia: materiaId
    })
    return res.status(200).send({exercicio:exercicio._id})
  }
};
