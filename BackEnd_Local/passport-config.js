if(process.env.NODE_ENV !== 'production'){ //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const db = mongoose.connection


function initialize(passport){

    const authenticateUser = async (username, pass, done) => {
        var waitforgetUserbyUsername = new Promise((resolve, reject) => {
            const cursor = db.collection('users').find({username : username});
              cursor.each(function(err, doc) {
                    resolve(doc)})  
              });
          
             waitforgetUserbyUsername.then((User) => {
                 if(User == null) {
                    return done(null, false, { message: 'Incorrect username or password!'})
                 }
                
                 try {
                     var waitforpass = new Promise((resolve, reject) => {
                         var passiscorrect = bcrypt.compare(pass,User.pass)
                         resolve(passiscorrect)
                     })

                     waitforpass.then((passiscorrect) => {
                        if(passiscorrect){
                            return done(null, User)
                         } else {
                            return done(null, false, { message: 'Incorrect username or password!'})
                         }
                     })
                    } catch (e) {
                        return done(e);
                    }})
    }

     const authenticateAdmin = async (username, pass, done) => {
        var waitforgetUserbyUsername = new Promise((resolve, reject) => {
            const cursor = db.collection('admins').find({username : username});
              cursor.each(function(err, doc) {
                    resolve(doc)})  
              });
          
             waitforgetUserbyUsername.then((User) => {
                 
                 if(User == null) {
                    return done(null, false, { message: 'Incorrect username or password!'})
                 }
                
                 try {
                     var waitforpass = new Promise((resolve, reject) => {
                         var passiscorrect = bcrypt.compare(pass,User.pass)
                         resolve(passiscorrect)
                     })

                     waitforpass.then((passiscorrect) => {
                        if(passiscorrect){

                            return done(null, User)
                         } else {
                            return done(null, false, { message: 'Incorrect username or password!'})
                         }
                     })
                    } catch (e) {
                        return done(e);
                    }})
    }
  
    passport.use('user', new LocalStrategy({usernameField: 'username',  passwordField: 'pass'},authenticateUser))
    
    passport.use('admin', new LocalStrategy({usernameField: 'username',  passwordField: 'pass'},authenticateAdmin))

    passport.serializeUser((user, done) => done(null,user._id))
    passport.deserializeUser((_id, done) => { 
        var waitforgetUserbyID = new Promise((resolve, reject) => {
            const cursor = db.collection('Users').find({_id : mongoose.Types.ObjectId(_id)});
            
              cursor.each(function(err, doc) {
                  resolve(doc)}
              )})

              waitforgetUserbyID.then((User) => {
                  if(User == null){
                    var waitforGetAdminByID = new Promise((resolve, reject) => {
                    const cursor = db.collection('Admins').find({_id : mongoose.Types.ObjectId(_id)});
                    cursor.each(function(err, doc) {
                        resolve(doc)}
                    )})

                    waitforGetAdminByID.then((User) => 
                    {
                        return done(null,User)
                    })
                  }
                  else{
                      return done(null, User)
                    }
                
              })
         })

}

module.exports = initialize
