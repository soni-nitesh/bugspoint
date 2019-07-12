'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
class UserController {

    async register({request})
    { console.log('test') 
    // const user = await User.query().where('email',request.input('email')).first();
    // console.log(user.mobile);
    // if (user.mobile) {
    //   return 1;
    // }
    // else {
    //   const user = await User.query().where('mobile', request.input('mobile')).first();
    //   console.log(user.email); 
    //   if(user.email){
    //      return 2;
    //    }
    // }
    
     let {
      name,
      email,
      password,
      mobile
  } = request.all(); 
    console.log(name);
  const user = await User.create({
     name,
     email,
     mobile,
     password
 }); 
    user.save();
    console.log(user);
    return 0;
    }    

      async login({auth, request, session, reponse}){
        const { log, password } = request.all()
        console.log(log),
        console.log(password)
        console.log('came in backend')     
        const user = await User.query().where('email',log).first()
        console.log(user);
        if(user)
        { 
            const passwordVerified  = await Hash.verify(password,user.password )
            if(passwordVerified)
            { console.log('email')
            const token = await auth.attempt(user.email,password)
             return(token)   
            }
        }
        else{
            const user = await User.query().where('mobile',log).first()
            console.log(user);
        if(user)
        { console.log(user);
            const passwordVerified  = await Hash.verify(password,user.password )
            if(passwordVerified)
            { 
             const token = await auth.attempt(user.email,password)
             return(token)
            }
        }
       }
       console.log(user);
       return 0
      }  
     }
    
module.exports = UserController
