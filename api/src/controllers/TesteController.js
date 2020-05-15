const Exercicio = require('../models/Exercicio');
const Teste = require('../models/Teste');

module.exports = {
  async store(req, res) {
    const { input, output, exercicioId, userId } = req.body;
    if (!input || !output || !userId)
      return res.status(401).send({ status: "error", message: "Informações inválidas.", data: null })

    let exercicio
    try{
        exercicio = await Exercicio.findById(exercicioId).populate("materia", "professor")
        if (!exercicio)
            return res.status(401).send({ status: "error", message: "Exercicio inválido", data: null })
        
        if(exercicio.materia.professor != userId)
            return res.status(401).send({ status: "error", message: "Exercicio não pertence a este professor.", data: null })
        
        teste = await Teste.create({
            input,
            output,
            exercicio: exercicioId
        })

    }catch(e){
        return res.status(401).send({ status: "error", message: e.message, data: null })
    }

    return res.status(200).send({ status: "success", message: "Teste cadastrado!!!", data: { exercicio } })
  },

  async getTestesExercicio(req,res){
    const { userId } = req.body;
    const { exercicioId } = req.params;
    
    let testes
    try {
        if(!exercicioId)
            return res.status(401).send({ status: "error", message: e.message, data: null })
        
        let exercicio = await Exercicio.findById(exercicioId).populate("materia")
        if(!exercicio)
            return res.status(401).send({ status: "error", message: "Exercicio inválido", data: null })
        if(exercicio.materia.professor != userId)
            return res.status(401).send({ status: "error", message: "Exercicio não pertence a este professor.", data: null })
        testes = await Teste.find({exercicio: exercicioId})

    } catch (e) {
        return res.status(401).send({ status: "error", message: e.message, data: null })
    }
    return res.status(200).send({ status: "success", message: "Teste cadastrado!!!", data: { testes } })
  }
};
