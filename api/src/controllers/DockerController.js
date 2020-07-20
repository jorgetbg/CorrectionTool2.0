require("dotenv").config();
const Docker = require("dockerode");
const FeedbackController = require('./FeedbackController')
const FileController = require("./FileController");
var Promise = require("es6-promise").Promise;
const path = require("path");

let filaDeExecucao = [];
let docker;

module.exports = {
  executarOperacao(_parametroEntrada){
      filaDeExecucao.push(_parametroEntrada)
      operadorLoop()
  },
  async containerCallback(req, res){
    //FeedbackController.generateFeedbackFromDocker(req.body)
    console.log("Ae maluco, a correção terminou")
    console.log(req.body)
    res.send(200)
  }
};

let executando = false;

async function operadorLoop(){
  if(executando == true) return;

  do{
    executando = true;
    let resolucao = filaDeExecucao.shift()
    await corrigir(resolucao)
  }while(filaDeExecucao.length > 0)
  executando = false;
}

async function corrigir(_parametroEntrada) {
  try {
    executarContainer(_parametroEntrada)
  } catch (e) {
    throw e;
  }
}




function getDocker() {
  if (docker == null) docker = new Docker({ protocol: 'http', host: 'host.docker.internal', port: 2375 })
  return docker;
}

function createContainer(_parametroEntrada) {
  return new Promise((resolve, reject) => {
    var docker = getDocker();
    docker
      .createContainer({
        Image: "octave_correction_engine:latest",
        //AttachStdout: true,

        HostConfig: {
          Binds: ["G:/Repositorios/CorrectionTool2.0/api/uploads:/usr/local/Exercicios/"], //necessario colocar diretorio dos uploads da maquina HOST
        },
        Cmd: ["python3", "/opt/corretor/init_code.py" , `${prepararJsonEntrada(_parametroEntrada)}`]
        //Cmd: ["tail", "-f", "/dev/null"], //mantem container vivo
      }, function (err, container) {
        if (err) {
          console.error(err)
          reject(err)
        }
        /*
        container.attach({ stream: true, stdout: true, stderr: true }, function (
          err,
          str
        ) {
          str.pipe(process.stdout);
        });
        */
        container.start();
        resolve(container);
      })
  });
}

async function executarContainer(path) {
  createContainer(path)
    .catch(e => {
      console.error(e)
    });
}

function prepararJsonEntrada(_parametroEntrada){
  for(json in _parametroEntrada){
    _parametroEntrada[json] = `${JSON.stringify(_parametroEntrada[json])}`
    _parametroEntrada[json] = _parametroEntrada[json].replace(/\\/g, "");
    _parametroEntrada[json] = _parametroEntrada[json].replace(/\s/g, "");
  }

  return _parametroEntrada
}