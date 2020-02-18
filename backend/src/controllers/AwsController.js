require('dotenv').config()
const AWS = require('aws-sdk')
const Teste = require('../models/Teste');

AWS.config({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    region: process.env.aws_region
})
const ECS = new AWS.ECS()

module.exports = {
    async corrigirResolucao(resolucao) {
        if (!resolucao) throw "Resolução precisa ser informada."
        let testes
        try {
            testes = await Teste.find({ exercicio: resolucao.exercicio })
            console.log(testes)
            testes.forEach(teste => {
                let file = {
                }
            })
        } catch (e) {
            throw e
        }
    },
    async invocarContainer() {
        var params = {
            cluster: "Correction-Cluster",
            taskDefinition: "corretor-octave:1",
            overrides: {
                containerOverrides: [
                    {
                        command: [
                            'octave',
                            '--eval',
                            '3+5',
                        ],

                        name: 'octave-image',
                    },
                ],
            },
        };

        ECS.runTask(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        })
    }
}