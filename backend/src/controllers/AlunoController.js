const Aluno = require('../models/Aluno');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    let aluno = await Aluno.findOne({ email });

    if (!aluno)
      res.send("Usuario ou senha incorretos.",401)

    if(aluno.password == password)
      res.send({"user_id":aluno._id})

    else
      res.send("Usuario ou senha incorretos.", 401)

  },
  async register(req, res){
    const {email, nome, password} = req.body;
    if(!email || !nome || !password) 
      return res.send("Informações invalidas!",400)

    let aluno = await Aluno.findOne({email})
    console.log(aluno)
    if(aluno)
      return res.send("Este endereço de email já esta cadastrado!")

    await Aluno.create({
      email,
      nome,
      password
    })

    return res.sendStatus({"user_id":aluno._id});

  }
};
