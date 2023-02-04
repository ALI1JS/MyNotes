const express =require('express');
const path=require('path');
const connectDB=require('./config/db');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const passport = require('passport');
const flash=require('connect-flash');
const {body,validationResult}=require('express-validator');
const app=express();




// settings:
 //==> PORT:
 const port=5000||process.env.PORT;


 //==> Middleware for use Form body:
 app.use(express.urlencoded({extends:true}));
 app.use(express.json());

//  session setting:
app.set('trust proxy', 1)
app.use(cookieParser());

app.use(session({
    name:'auth',
    secret:"NoteAppwithnodejsandmongoose",
    resave:false,
    saveUninitialized:true,
    cookie: { 
        secure:false,
        maxAge:1000*60*60,//one hour

     }
}))

// setting for passport:
// require('./config/passport');
// app.use(passport.initialize());
// app.use(passport.session());

 // Connection to MongoDatabase:
 connectDB();
//  ===>setting for use static file:
app.use(express.static('public'));

// view engine (ejs):
app.set('view engine','ejs');
//flash settings
app.use(flash());
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
// App Router :
app.use('/',require('./routes/indexroute').Router)
app.use(require('./routes/authrouter').Router)
app.use(require('./routes/dashboard').Router)
app.use(require('./routes/addnoterouter').Router)
app.use(require('./routes/editacount').Router)

// the 404 error:
app.use('*',(req,res,next)=>{
    const locals={
        title:"not found",
        username:null
    }
     res.status(404).render('notfound',locals);
})

app.listen(port,()=>{
    console.log(`the server is open on :${port}  port` );
})

