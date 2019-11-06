const mongoose = require('mongoose');

const resolucaoSchema = new mongoose.Schema({
    resolucaoFilename: {
        type: String,
        trim: true,
        required: true
    },
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },
    exercicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercicio',
        required: true
    },
    tentativas: {
        type: Number,
        default: 1,
    },
    dataSubmissao: {
        type: Date,
        default: new Date().toISOString()
    }
})


module.exports = mongoose.model('Resolucao', resolucaoSchema);