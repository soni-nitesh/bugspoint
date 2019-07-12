'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
const Encryption = use('Encryption')
class UserController {

    async register({request})
    { console.log('test') 
      
    const rules = {
      email: 'unique:users',
      mobile: 'unique:users'
    }
    
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])
        
      return response.redirect('back')
    }
    
     let {
      name,
      email,
      password,
      mobile
  } = request.all(); 
    
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
        const user = await User.query().where('email',log).first()
        if(user)
        { 
            const passwordVerified  = await Hash.verify(password,user.password )
            if(passwordVerified)
            { 
            const token =  Encryption.encrypt(user)
         
             return(token)   
            }
        }
        else{
            const user = await User.query().where('mobile',log).first()
        if(user)
        { 
            const passwordVerified  = await Hash.verify(password,user.password )
            if(passwordVerified)
            { 
              const token =  Encryption.encrypt(user)
              
             return(token)
            }
        }

        }
       

        }  
    }
    
module.exports = UserController
