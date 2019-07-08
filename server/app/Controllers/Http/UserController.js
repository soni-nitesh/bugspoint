'use strict'

//const {validateAll} = use('validator')
const User = use('App/Models/User')

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
            var log = request.input('log')
            let user = await User.findBy('email', log);
         user = user.toJSON();
         console.log(user.email);
         console.log(log)
         if(user.email == log){       
            console.log(log)
        let email = request.input('log');
          let password = request.input('password');
            
             const token = await auth.attempt(email, password)
             console.log(token);
             return token;
      
             } 
             else {
                 console.log('not found');
             }
    } 
        }  
    
module.exports = UserController
