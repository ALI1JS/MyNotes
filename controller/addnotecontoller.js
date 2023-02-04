const Note=require('../models/notemodel');


module.exports.getAddNote=async(req,res,next)=>{
    const locals={
        title:'add note'
    }
        res.render('addnote',{
            locals:locals,
            username:req.flash('username'),
            empty:req.flash('empty')
        })
    
}

// addnote

module.exports.addNote=(req,res,next)=>{
    
        const newNote=new Note({
            Owner:req.session.ID,
            title:req.body.title,
            body:req.body.note
         })
         if(!req.body.title==""||!req.body.note==""){
          newNote.save().then((note)=>{
            if(note){
                res.redirect('/Dashboards');
            }else{
                console.log("no note")
            }
         }).catch((err)=>{
            console.log(err)
         })
        }else{
            req.flash('empty',"Fill the empty filed please !")
            res.render('addnote',{
                locals:{title:'AddNote'},
                username:req.flash('username'),
                empty:req.flash('empty')
            })
        }
    
     
}
