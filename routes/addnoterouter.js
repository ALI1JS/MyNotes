const Router=require('express').Router();
const Contoller=require('../controller/addnotecontoller')
const authMiddleware=require('../middleware/auth');
const {body}=require('express-validator');
Router.get('/addnote',authMiddleware.Checker,Contoller.getAddNote);
Router.post('/addnote',[
    body('title').trim(),
    body('note').trim()
],Contoller.addNote);

module.exports.Router=Router;