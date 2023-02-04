
const Router=require('express').Router();
const Controller=require('../controller/dashboardcontoller');
const authMiddleware=require('../middleware/auth');
const {body}=require('express-validator');

Router.get('/Dashboards',authMiddleware.Checker,Controller.getDashboard);
Router.get('/delete/:id',Controller.deleteNote);
Router.get('/edit/:id',Controller.geteditNote);
Router.post('/editNote/:id',[
    body('title').trim(),
    body('note').trim()
],Controller.editNote);
Router.post('/notesearch',Controller.searchNote);

module.exports.Router=Router;
