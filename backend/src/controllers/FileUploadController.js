const fs = require("fs");
const path = require("path");

module.exports = {
  async deletarArquivo(req, res) {
    try {
      fs.exists(req.path).then(() => {
        fs.unlink(req.path);
      });
    } catch (e) {
      throw e;
    }
  },
  async salvarDefinitivo(file, path) {},
  gerarDiretorio(file, materiaId, exercicioId, userId, tentativas) {
    let filePath;
    try {
      filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        "" + materiaId,
        "" + exercicioId,
        userId
      );
    } catch (e) {
      console.log(e);
    }
    return filePath;
  },
  async rename(tempPath, definitivoPath, originalName) {
    try{
        fs.mkdir(definitivoPath, { recursive: true }, e => {
            if(e) throw e;
            else {
                fs.rename(tempPath, path.resolve(definitivoPath, originalName), e => {
                    if (e) throw e;
                });
            }
        });
    }catch(e){
        throw e
    }
  }
};
