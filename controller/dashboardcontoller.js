
const Notes=require('../models/notemodel');
const Users=require('../models/usersmodels');


module.exports.getDashboard=async(req,res,next)=>{
      const locals={
        title:'My notes'
      }

       try {
        Notes.find({Owner:req.session.ID},(err,notes)=>{
          req.flash('notes',notes)
          if(notes){
              res.render('Dashboards',{
               locals:locals,
                Notes:notes,
                username:req.flash('username'),
                searchNote:req.flash('searchNote')
              })
          }
          else{
             res.status(401).send("there are " +err)
          }
     })
      
       } catch (error) {
          res.status(401).send("there are " + error);
       }
}

// delete note:

module.exports.deleteNote=async(req,res,next)=>{
    try {
      // if(sure){
       Notes.findByIdAndRemove({_id:req.params.id},(err,sucess)=>{
          if(sucess){
              res.redirect('/Dashboards')
          }else{
            console.log(err)
            res.status(401).send("there are " +err)
          }
       })
      // }
    } catch (error) {
      res.status(401).send("there are " + error)
    }  
}

// GIT NOTE:
module.exports.geteditNote=async(req,res,next)=>{
  const locals={
    title:"edit Note"
  }
   try {

       Notes.findById({_id:req.params.id},(err,note)=>{
           if(note){
                 res.render('edit',{
                  locals:locals,
                  Note:note,
                  username:req.flash('username')[0]
                 })
           }else{
            res.status(401).send("there are " +err)
           }
       })
    
   } catch (error) {
     res.status(401).send("there are " +error)
   }
}

// EDIT NOTE:
module.exports.editNote=async(req,res,next)=>{
     Notes.findByIdAndUpdate({_id:req.params.id},{
      Owner:req.session.ID,
      title:req.body.title,
      body:req.body.note
     },(err,note)=>{
         if(note){
              res.redirect('/Dashboards')
         }else{
            res.status(401).send("there are "+err);
         }
     })
}

// SEARCH ON NOTE :
// toLocaleUpperCase()
module.exports.searchNote=async(req,res,next)=>{
    
    try {
      Notes.find({title:req.body.keysearch},(err,note)=>{

        if(note){
                 req.flash('searchNote',note)
                 res.render('Dashboards',{
                    locals:{title:req.body.keysearch},
                    Notes:req.flash('notes'),
                    username:req.flash('username'),
                    searchNote:req.flash('searchNote')
                  })
          }
           else{
             res.redirect('/Dashboards')
             console.log("this note doesnt exist search again")
          }
              
        if(err){
          res.redirect('/Dashboards')
          console.log("the error "+err);
        }
 })
    } catch (error) {
      res.redirect('/Dashboards')
      console.log(error)
    }
  

}