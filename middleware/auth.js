

module.exports.Checker=(req,res,next)=>{
    if(req.session.ID){
        console.log("this user is already authintacted")
        next();
    }else{
        res.redirect('/auth-login-google');
    }
}