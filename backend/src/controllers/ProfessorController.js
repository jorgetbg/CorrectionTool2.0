const Professor = require('../models/Professor');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if(!email || !password) 
      return res.send({error:"Informações inválidas."},400)

    let professor = await Professor.findOne({ email });

    
    if (!professor) {
      //professor = await Professor.create({ email });
      return res.send({error:"Usuario ou senha incorretos."}, 401);
    }
    if(password == professor.password)
      return res.json({"user_id":professor._id});

    return res.send({error:"Usuario ou senha incorretos."}, 401);

    

  }
};
