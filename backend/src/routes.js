const express = require('express');
const multer = require('multer');
const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const MateriaController = require('./controllers/MateriaController');
const MatriculaController = require('./controllers/MatriculaController');
//const uploadConfig = require('./config/upload');

const routes = express.Router();
//const upload = multer(uploadConfig);

routes.post('/alunos/login', AlunoController.login)
routes.post('/alunos/create', AlunoController.store)

routes.post('/professor/login', ProfessorController.login)
routes.post('/professor/materias/create', MateriaController.store);

routes.get('/materias', MateriaController.index)

routes.get('/matricula', MatriculaController.index)
routes.post('/matricula/create', MatriculaController.store)


// routes.post('/sessions', SessionController.store);


module.exports = routes;
