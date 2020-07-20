const fs = require("fs");
const path = require("path");

module.exports = {
  resolvePathExercicio(materiaId, exercicioId, userId, filename) {
    let filePath;
    try {
      filePath = "/usr/local/Exercicios/" + materiaId + "/" + exercicioId + "/" + userId + "/" + filename
    } catch (e) {
      console.log("resolvePathExercicio", e);
      throw e;
    }
    return filePath;
  },
  resolvePathInputs(materiaId, exercicioId, testes) {
    try {
      let folderPath = "/usr/local/Exercicios/" + materiaId + "/" + exercicioId
      generateInputs(testes, folderPath)
      return folderPath + "/inputs.csv";
    } catch (e) {
      console.log("resolvePathInputs", e)
      throw e;
    }
  },
  resolvePathOutput(materiaId, exercicioId, userId) {
    try {
      let filePath;
      filePath = "/usr/local/Exercicios/" + materiaId + "/" + exercicioId + "/" + userId + "/output.txt"
      console.log("output:",filePath)
      return filePath;
    } catch (e) {
      console.log("resolvePathOutput", e)
      throw e
    }
  },
  async resolvePathJson(materiaId, exercicioId, aluno, input) {
    let filePath;
    let filePathBinded;
    try {
      filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        "" + materiaId,
        "" + exercicioId,
        "" + aluno,
        "" + "exec.json"
      );
      await writeInputJson(filePath, input) //salva o arquivo na maquina HOST
      filePathBinded = "/usr/local/Exercicios/" + materiaId + "/" + exercicioId + "/" + aluno + "/exec.json" //Retorna diretorio do container

      return filePathBinded;
    } catch (e) {
      console.log("resolvePathJson",e);
      throw e
    }
  }
};
async function writeInputJson(filePath, data){
  try {
    let folderPath = path.resolve(filePath, "..")
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data))
  } catch (e) {
    console.log("writeInputJson", e)
    throw e
  }
}

function generateInputs(testes, filePath) {
  try {
    let inputsString = "";
    testes.forEach(teste => {
      teste.input.forEach((inp, index) => {
        inputsString += `${inp}`;
        if (index == teste.input.length - 1) return;
        inputsString += "|";
      });
      inputsString += "\n";
    });
    fs.mkdirSync(filePath, { recursive: true })
    fs.writeFileSync(filePath + "/inputs.csv", inputsString);
    console.log("input:", filePath + "/inputs.csv")
  } catch (e) {
    console.log("Não foi possivel criar o diretório.", e)
    throw e
  }
}
