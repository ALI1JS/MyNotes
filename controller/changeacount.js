 const User=require('../models/usersmodels');
 const bcrypt=require('bcrypt');

module.exports.EditAcount=async (req,res,next)=>{
    
      try {
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(hash){
                User.findByIdAndUpdate({_id:req.session.ID},{
                    userName:req.body.username,
                    password:hash,
                    email:req.body.email,
                    avatar:req.file.filename
                  },(err,user)=>{
                       if(err){
                         console.log(err)
                         res.redirect('/welcome')
                       }
                        else{
                            if(user){
                                res.redirect('/welcome')
                                console.log(user.avatar) 
                            }else res.redirect('/welcome')
                        }   
                  })
            }
            else{
                console.log(err)
               res.redirect('/welcome');
            }
        })
          
      } catch (error) {
        res.redirect('/welcome')
        console.log(error)
      }   
   

}

