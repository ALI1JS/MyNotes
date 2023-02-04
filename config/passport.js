const passport=require("passport");
const localStrategy=require('passport-local').Strategy;
const bycrypt=require('bcrypt');
const Users=require('../models/usersmodels')


passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:'password'
},(username,passport,done)=>{

    Users.find({email:username},(err,user)=>{
        if(err)return done(err)
        if(!user)return done(null,false);
        if(user) {
            bycrypt.compare(passport,user.password,(err,isMatched)=>{
                if(err) return done(err);
                if(!isMatched) return done(null,false)
                if(isMatched) return done(null,user);
            })
        }
    })
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    Users.findById(id,(err,user)=>{
        return done(err,user);
    })
})