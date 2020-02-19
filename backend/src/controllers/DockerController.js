const Docker = require('dockerode')
const Teste = require('../models/Teste')

let filaDeExecucao = []

module.exports = {
    async corrigirResolucao(resolucao){
        if(!resolucao)  throw "Resolucao não informada."
        let testes
        try {
            testes = await Teste.find({exercicio: resolucao.exercicio})
            testes.forEach(teste => {
                filaDeExecucao.push(teste)
            })
        } catch (e) {
            throw e
        }
    },
    async executarContainer(req, res){
        var docker = new Docker();
        let container
        docker.createContainer({
            Image: 'roppwer/correction-tool',
            Cmd: ['ls', '/Faculdade/'],
            AttachStdout: true,
            HostConfig: {
                Binds: ["/home/roppwer/Documents/Faculdade:/Faculdade:ro"]
            }
        }).then(cont => {
            container = cont
            container.attach({stream: true, stdout: true, stderr: true}, function(err, str){
                str.pipe(process.stdout)
            })
            console.dir(container)
            container.start()
        })

        /*
        docker.run("roppwer/correction-tool", ["ls"], process.stdout).then(r => {
            console.log(r)
            return res.json(r)

        })
        */
       res.send(200)
    }
}