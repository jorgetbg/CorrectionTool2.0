const Aluno = require('../models/Aluno');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    let aluno = await Aluno.findOne({ email });

    if (!aluno)
      res.send({error:"Usuario ou senha incorretos."}, 401)

    if(aluno.password == password)
      res.send({"user_id":aluno._id})

    else
      res.send({error:"Usuario ou senha incorretos."}, 401)

  },
  async store(req, res){
    const {email, nome, password} = req.body;
    if(!email || !nome || !password) 
      return res.send({error:"Informações inválidas."},400)

    let aluno = await Aluno.findOne({email})
    if(aluno)
      return res.send({error:"Este endereço de email já esta cadastrado!"})

    aluno = await Aluno.create({
      email,
      nome,
      password
    })

    return res.send({"user_id":aluno._id});
  }
};
