const Resolucao = require('../models/Resolucao')
const Exercicio = require('../models/Exercicio')
const fs = require('fs')
const path = require('path')

module.exports = {
    async store(req, res) {
        const {filename} = req.file
        const {userId, exercicioId} = req.body

        let resolucao, exercicio, prazoDiff,prazoString
        try{
            exercicio = await Exercicio.findById(exercicioId)
            if(!exercicio)  throw "Exercício inexistente."

            prazoDiff = Date.now() - exercicio.prazo
            if(prazoDiff > 0) throw "Submissão atrasada."

            resolucao = await Resolucao.findOne({aluno:userId, exercicio:exercicioId})
            if(resolucao){
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', resolucao.resolucaoFilename))
                resolucao.resolucaoFilename = filename
                resolucao.__v++
                await resolucao.save()
            }else{
                resolucao = await Resolucao.create({
                    exercicio: exercicioId,
                    aluno: userId,
                    resolucaoFilename: filename
                })
            }
        }catch(e){
            return res.status(400).send({ status: "error", message: e, data: null })
        }

        return res.status(200).send({ status: "success", message: "Exercício submetido!!!", data: { "resolucao": resolucao._id, "tentativas":resolucao.__v, entrega: prazoString } })
    }
};
