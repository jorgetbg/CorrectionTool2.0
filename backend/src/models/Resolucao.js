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
})


module.exports = mongoose.model('Resolucao', resolucaoSchema);