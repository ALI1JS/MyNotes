
const Users=require('../models/usersmodels');
const bcrypt=require('bcrypt');
const { validationResult } = require('express-validator');
const Notes=require('../models/notemodel');


module.exports.getLogin= (req,res,next)=>{
    const locals={
        title:"auth_login"
    }
        res.render('login',{
            locals:locals,
            username:null
        })
}

module.exports.getSignup=(req,res,next)=>{
    const locals={
        title:"auth-Signup"
    }
    res.render('signup',{
        locals:locals,
        username:null,
        errors:req.flash('errors'),
        Isexist:req.flash('exist')
    });
}

module.exports.getForget=(req,res,next)=>{
    const locals={
        title:"forget-password"
    }
    res.render('forgetpass',{
        locals:locals,
        username:null   
    });
}


module.exports.postSignup=async(req,res,next)=>{
     //validation for all input :  
     // check for entery email:
    // hash the password:
    // save user data in database:
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        req.flash('errors',errors.array());
        console.log(errors)
        res.render('signup',{
            locals:{title:"signup"},
            username:null,
            errors:req.flash('errors'),
            Isexist:req.flash('exist')
        });
    }
    else{

     try {

        Users.findOne({email:req.body.email},(err,user)=>{
            if(user){
                res.redirect('/auth-signup-google')
                req.flash('exist','this user is already exist try to login');
            }
            else{
                if(err){
                    res.redirect('/auth-signup-google')
                    console.log(err)
                }else{
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(hash){
                            const newUser=new Users({
                                userName:req.body.username,
                                email:req.body.email,
                                password:hash
                             })
                             newUser.save((err)=>{
                                if(err){
                                    console.log(err)
                                    res.redirect('/auth-signup-google')
                                } else{
                                    res.redirect('/auth-login-google')
                                }
                             });
                        }else{
                            console.log(err)
                        }
                       
                    })
                   
                }
                 
                 
             }
        })
    } catch (error) {
        res.status.send(error)
    }
   }
           
}

module.exports.postLogin=async(req,res,next)=>{
    const locals={
        title:'welcome '
    }
       try{
             Users.findOne({email:req.body.email},(err,user)=>{
                 if(user){
                     bcrypt.compare(req.body.password,user.password).then((isMatched)=>{
                         if(isMatched){
                            req.session.ID=user._id;
                            req.session.save();
                            req.flash('username',user);
                            req.flash('userID',user._id);
                            // count of notes documents
                            Notes.countDocuments({Owner:user._id},(err,count)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    req.flash('counter',count);
                                }
                            })
                            res.render('welcome',{
                             locals:locals,
                             username:req.flash('username'),
                             password:req.body.password,
                             count:req.flash('counter')
                            })
                         }else{
                            res.redirect('/auth-login-google')
                         }
                     }).catch((err)=>{
                        console.log(err);
                        res.redirect('/auth-login-google');
                     })
                 }else{
                    res.render('login',{
                        locals:{title:"login"},
                        IsnotExist:req.flash('isnotexist'," this user is't exist try again or create acount "),
                    })
                 }
             })
       }catch(error){
          res.status(401).send(error)
       }
}

module.exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err)console.log(err)
        else res.redirect('/auth-login-google');
    })
}
