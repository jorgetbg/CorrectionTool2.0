const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
    validar(req, res, next, type) {
        jwt.verify(req.cookies['x-access-token'], process.env.JWT_KEY, function (err, decoded) {
            if (err)
                return res.status(401).send({ status: "error", message: err.message, data: null })
            if (type && decoded.role != type)
                return res.status(403).send({ status: "error", message: `Rota exclusiva para ${type}`, data: null })
            req.body.userId = decoded.id
            req.body.role = decoded.role
            next()
        })
    },
    generateToken(data){
        //return jwt.sign(data,process.env.JWT_KEY, {expiresIn: '2h'})
        return jwt.sign(data,process.env.JWT_KEY)
        
    }
};
