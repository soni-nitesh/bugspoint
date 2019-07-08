'use strict'

//const {validateAll} = use('validator')
const User = use('App/Models/User')
const Hash = use('Hash')
class UserController {

    async register({request , session, response})
    {
    //         const validation =  await validateAll(request.all(),{
    //       name: 'required',
    //       email: 'required|unique:users,email',
    //       mobile: 'required|unique:users,mobile',
    //       password: 'required'
    //   })
        
    //     if (validation.fail()){
    //     session.withErrors(validation.message()).flashExcept(['required'])
           //return response.redirect('back')
    //  }  
            console.log('email');
            let {
                name,
                email,
                password,
                mobile
            } = request.all() 
           const user = await User.create({
               name,
               email,
               mobile,
               password
           })
           user.save();
           return user;
        
    }   

      async login({auth, request, session, reponse}){
        const { log, password } = request.all()
        
        const user = await User.query().where('email',log).first()
        if(user)
        { 
            const passwordVerified  = await Hash.verify(password,user.password )
            if(passwordVerified)
            {
            const token = await auth.attempt(log,password)
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
             const token = await auth.attempt(user.email,password)
             return(token)
            }
        }

        }
       

        }  
    }
    
module.exports = UserController
