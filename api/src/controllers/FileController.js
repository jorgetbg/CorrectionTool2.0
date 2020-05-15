const mfs = require("memfs");
const fs = require("fs");
const path = require("path");

module.exports = {
  resolvePathExercicio(materiaId, exercicioId, userId, filename) {
    let filePath;
    try {
      filePath = "/usr/local/Exercicios/" + materiaId + "/" + exercicioId + "/" + userId + "/" + filename
    } catch (e) {
      console.log(e);
    }
    return filePath;
  },
  resolvePathInputs(testes) {
    let filePath;
    try {
      filePath = "/usr/local/Exercicios/" + testes[0].exercicio.materia + "/" + testes[0].exercicio._id

      let inputsString = "";
      testes.forEach(teste => {
        teste.input.forEach((inp, index) => {
          inputsString += `${inp}`;
          if (index == teste.input.length - 1) return;
          inputsString += "|";
        });
        inputsString += "\n";
      });
      mfs.fs.mkdirSync(filePath, { recursive: true });

      mfs.fs.writeFileSync(filePath + "/inputs.csv", inputsString);
      return filePath + "/inputs.csv";
    } catch (e) {
      console.log(e);
    }
  },
  resolvePathOutput(testes, userId) {
    let filePath;
    try {
      filePath = "/usr/local/Exercicios/" + testes[0].exercicio.materia + "/" + testes[0].exercicio._id + "/" + userId + "/output.txt"
      return filePath;
    } catch (e) {
      console.log(e);
    }
  },
  resolvePathJson(testes, userId, input) {
    let filePath;
    let filePathBinded;
    try {
      filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        "" + testes[0].exercicio.materia,
        "" + testes[0].exercicio._id,
        "" + userId,
        "" + "exec.json"
      );
      fs.writeFileSync(filePath, JSON.stringify(input)); // Escreve JSON no diretorio local
      filePathBinded = "/usr/local/Exercicios/" + testes[0].exercicio.materia + "/" + testes[0].exercicio._id + "/" + userId + "/exec.json"

      return filePathBinded;
    } catch (e) {
      console.log(e);
    }
  }
};
