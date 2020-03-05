require("dotenv").config();
const Docker = require("dockerode");
const Teste = require("../models/Teste");
const FileController = require("./FileController");
var Promise = require("es6-promise").Promise;

let filaDeExecucao = [];
let docker;

module.exports = {
  async corrigirResolucao(resolucao) {
    if (!resolucao) throw "Resolucao não informada.";
    let testes;
    try {
      testes = await Teste.find({ exercicio: resolucao.exercicio }).populate(
        "exercicio",
        "materia"
      );
      if (testes.length == 0) return;
      let pathExercicio = FileController.resolvePathExercicio(
        testes[0].exercicio.materia,
        testes[0].exercicio._id,
        resolucao.aluno,
        resolucao.resolucaoFilename
      );
      let pathInputs = FileController.resolvePathInputs(testes);
      let pathOutput = FileController.resolvePathOutput(
        testes,
        resolucao.aluno
      );

      let input = {
        algorithm: pathExercicio,
        inputs: pathInputs,
        output: pathOutput
      };

      let pathJSONFile = FileController.resolvePathJson(
        testes,
        resolucao.aluno,
        input
      );

      filaDeExecucao.push(pathJSONFile);
      executarContainer(pathJSONFile);
    } catch (e) {
      throw e;
    }

    //console.log(filaDeExecucao);
  },
  async containerCallback(req, res) {
    console.log(req.body);
    res.sendStatus(200);
  }
};

function getDocker() {
  if (docker == null) docker = new Docker();
  return docker;
}

function createContainer(path) {
  return new Promise((resolve, reject) => {
    var docker = getDocker();
    /*
            docker.getEvents({}, (error, stream)=> {
                stream.pipe(process.stdout)
                //stream.on('data', (event)=> console.log(event) )
            })*/
    docker
      .createContainer({
        Image: "octavecorrector:1.0.1",
        //Cmd: ["bash"],
        AttachStdout: true,
        HostConfig: {
            Binds: [`/home:/usr/local/Exercicios`],
            /*
            Mounts: [{
                Target: "/usr/local/Exercicios",
                Source: "/home/roppwer/Documents/Faculdade/CorrectionTool2.0/backend/uploads",
                Type: "bind",
                
            }]*/
        },
        Cmd: ["python", "/opt/corretor/init_code.py", path],
      }, function (err, container){
        if(err){
            console.error(err)
            reject(err)
        }
        container.attach({ stream: true, stdout: true, stderr: true }, function(
          err,
          str
        ) {
          str.pipe(process.stdout);
        });
        container.start();
        resolve(container);
      })
  });
}

async function executarContainer(path) {
  console.log(path);
  createContainer(path)
    //.then(container => container.start())
    .catch(e => {
      console.error(e)
    });
}
