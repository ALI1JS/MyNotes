const Router=require('express').Router();
const flash = require('flash');
const Contoller=require('../controller/authcontrolle');
 const{body}=require('express-validator');


Router.get('/auth-login-google',Contoller.getLogin);

Router.get('/auth-signup-google',Contoller.getSignup);

Router.get('/forget',Contoller.getForget);

Router.post('/postSignup',[
body('username').not().isEmpty().withMessage('Username is required').isLength({min:5,max:15}).
withMessage("the Username must be at least 5char and most be 15 char").trim(),
body('email').not().isEmpty().withMessage('Email is required').isEmail().normalizeEmail().withMessage("Email invalid").trim(),
body('password').not().isEmpty().withMessage('Password is required').isLength({min:5,max:10}).
withMessage('the pasword must be at least 5 char and at most 10 char ').trim(),
body('confirm').custom((value,{req})=>{
    if(value!==req.body.password){
        return false;
    }
    else{
        return true;
    }
}).trim()
]
,Contoller.postSignup);

Router.post('/postLogin',Contoller.postLogin);
Router.get('/logout',Contoller.postLogout);

module.exports.Router=Router;