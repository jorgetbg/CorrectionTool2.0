const Professor = require('../models/Professor');

module.exports = {
  async login(req, res) {
    const { email } = req.body;

    let professor = await Professor.findOne({ email });

    if (!professor) {
      professor = await Professor.create({ email });
    }

    return res.json(professor);
  }
};
