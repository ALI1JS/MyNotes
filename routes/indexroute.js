
const Router=require('express').Router();
const auth=require('../middleware/auth');
const Contoller=require('../controller/indexcontroller')
// GetHome Page:
Router.get('/',Contoller.getHome);
Router.get('/welcome',auth.Checker,(req,res,next)=>{
     res.render('welcome');
})
Router.get('/linkedin',(req,res,next)=>{
res.redirect('www.linkedin.com/in/alijs')
})
Router.get('/github',(req,res,next)=>{
     res.redirect('https://github.com/Ali5Ismail')
})
Router.get('/telegrame',(req,res,next)=>{
     res.redirect('https://github.com/Ali5Ismail')
})


module.exports.Router=Router;