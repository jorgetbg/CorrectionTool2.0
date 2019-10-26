const express = require('express');
const multer = require('multer');
const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const MateriaController = require('./controllers/MateriaController');
//const uploadConfig = require('./config/upload');

const routes = express.Router();
//const upload = multer(uploadConfig);

routes.post('/alunos/login', AlunoController.login)
routes.post('/alunos/registrar', AlunoController.register)

routes.post('/professor/login', ProfessorController.login)

routes.post('/professor/materias/new', MateriaController.novaMateria);


// routes.post('/sessions', SessionController.store);


module.exports = routes;
