
module.exports.getHome=async (req,res,next)=>{
      const locals={
        title:"App Notes"
     }
    res.render('index',{
      locals:locals,
      username:null
    })
}


module.exports.getAbout=async(req,res,next)=>{
  const locals={
      title:"about-us"
  }
  res.render('about',{
    locals:locals,
    username:null
  });
}