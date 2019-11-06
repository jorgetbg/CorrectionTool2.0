require('dotenv').config();
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const AlunoController = require('./controllers/AlunoController');
const ProfessorController = require('./controllers/ProfessorController');
const MateriaController = require('./controllers/MateriaController');
const MatriculaController = require('./controllers/MatriculaController');
const ExercicioController = require('./controllers/ExercicioController');
const SessionController = require('./controllers/SessionController');
const ResolucaoController = require('./controllers/ResolucaoController');

const routes = express.Router();
const upload = multer(uploadConfig);


//Professor
routes.post('/professor/login',ProfessorController.authenticate)

//Aluno
routes.post('/aluno/login', AlunoController.authenticate)
routes.post('/aluno/create', AlunoController.store)

//Materias
routes.post('/materia/create',(req, res, next) => SessionController.validar(req, res, next, "professor") ,MateriaController.store)
routes.get('/materia/alunos',(req, res, next) => SessionController.validar(req, res, next, "professor") ,MateriaController.obterAlunosMatriculados)
routes.get('/materia',(req, res, next) => SessionController.validar(req, res, next), MateriaController.index)

routes.get('/matricula',(req, res, next) => SessionController.validar(req, res, next, "aluno"), MatriculaController.obterMatriculasAluno)
routes.post('/matricula/create',(req, res, next) => SessionController.validar(req, res, next, "aluno") , MatriculaController.store)

routes.post('/exercicio/create',(req, res, next) => SessionController.validar(req, res, next, "professor")  ,ExercicioController.store)
routes.get('/exercicio/show',(req, res, next) => SessionController.validar(req, res, next)  ,ExercicioController.getExerciciosMateria)



routes.post('/resolucao/submit', upload.single('arquivoResolucao'), (req, res, next) => SessionController.validar(req, res, next, "aluno") ,ResolucaoController.store)
routes.get('/resolucao/:exercicioId', (req, res, next) => SessionController.validar(req, res, next, "aluno") ,ResolucaoController.obterResolucaoDeExercicio)
routes.get('/resolucoes/:exercicioId', (req, res, next) => SessionController.validar(req, res, next, "professor") ,ResolucaoController.obterResolucoesDeExercicio)



// routes.post('/sessions', SessionController.store);


module.exports = routes;
