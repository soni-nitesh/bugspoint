'use strict'

const {validateAll} = use('validator')
const User = use('App/Models/User')

class UserController {
    async register({request , session, response}){

      const validation = await validate(request.all(),{
        email: 'required|email|unique:users,email',
        mobile: 'required|mobile|unique:users,mobile',
        password: 'required'
        })
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll();
            return response.redirect('back');
        }
        const user  = new User();
        user.name = request.input('name');
        user.mobile = request.input('mobile');
        user.email = request.input('email');
        user.password = request.input('password');
        
        await user.save()
       
       return 0 
      }
}
    async register({request , session, response})
    {
        
         console.log(request.input('name'));
        console.log(request.input('email'));
        console.log(request.input('password'));
        console.log(request.input('mobile'));
    //    return "test";
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
       
         if(request.input('email')){    
           //const validation =  await validateAll(request.all(),{
           //         email: 'required',
           //         password: 'required'
           //     })
           //       if (validation.fail()){
            //        session.withErrors(validation.message()).flashExcept(['password'])
           //        return "email failed"
           //    }
         console.log("email");
        let {
              email,
              password
            } = request.all();

             const token = await auth.attempt(email, password)
                 return token;
      
             } 
 
           if(request.input('mobile')){    
         //     const validation =  await validateAll(request.all(),{
         //         mobile: 'required',
         //         password: 'required'
         //     })
        //       if (validation.fail()){
          //        session.withErrors(validation.message()).flashExcept(['password'])
         //        return "mobile failed"
         //    }
         console.log("mobile");
         let {
             mobile,
             password
         } = request.all();
        
            const token = await auth.attempt(mobile, password)
                return token;
      
           } 
        }  
    
module.exports = UserController
