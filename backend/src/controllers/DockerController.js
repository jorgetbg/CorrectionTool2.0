require('dotenv').config()
const Docker = require('dockerode')
const Teste = require('../models/Teste')
var Promise = require('es6-promise').Promise;

let filaDeExecucao = []
let container = null
let docker = null

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
        getContainer().then(container => {
            container.start()
        }).catch(e=>{
            console.error(e)
        })

        
       res.sendStatus(200)
    },
    async containerCallback(req,res){
        console.log(req.body)
        res.sendStatus(200)
    },
}
function getDocker(){
    if(docker == null)
        docker = new Docker()
    return docker
}


function getContainer(){
    return new Promise((resolve, reject) => {
        if(container == null){
            var docker = getDocker()
            /*
            docker.getEvents({}, (error, stream)=> {
                stream.pipe(process.stdout)
                //stream.on('data', (event)=> console.log(event) )
            })*/
            docker.createContainer({
                Image: 'octavecorrector:1.0.1',
                Cmd: ['python', '/opt/corretor/init_code.py', '/opt/corretor/Exemplo/exec.json'],
                AttachStdout: true,
                HostConfig: {
                    Binds: [`${process.env.EXERCICIOS_DIRETORIO}:/usr/local/Exercicios`]
                }
            }).then(cont => {
                container = cont
                //container.on('exec_start', () => console.log( "start"))
                resolve(container)
                
                
                container.attach({stream: true, stdout: true, stderr: true}, function(err, str){
                    str.pipe(process.stdout)
                })
                container.start()
                //console.dir(container)
                
            }).catch(err => reject(err))
        }else
            resolve(container)
    })
}