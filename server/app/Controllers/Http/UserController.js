'use strict'

//const {validateAll} = use('validator')
const User = use('App/Models/User')

class UserController {

    async register({request , session, response}){
        const user  = new User()
        user.name = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        user.mobile = request.input('mobile')
        await user.save() ;
        console.log('dgh');
      }
}
    
//      async login({auth, request, session, reponse}){
       
//         if(request.input('email')){    
//         //     const validation =  await validateAll(request.all(),{
//         //         email: 'required',
//         //         password: 'required'
//         //     })
//         //       if (validation.fail()){
//         //        session.withErrors(validation.message()).flashExcept(['password'])
//         //        return "email failed"
//         //    }
//         console.log("email");
//         let {
//             email,
//             password
//         } = request.all();

//            const token = await auth.attempt(email, password)
//                return token;
      
//           } 
//           if(request.input('username')){    
//         //     const validation =  await validateAll(request.all(),{
//         //         username: 'required',
//         //         password: 'required'
//         //     })
//         //       if (validation.fail()){
//         //        session.withErrors(validation.message()).flashExcept(['password'])
//         //        return "email failed"
//         //    }
//         console.log("username");
//         let {
//             username,
//             password
//         } = request.all();
        
//         const token = await auth.attempt(username, password)
  
//         return token
//           } 
//           if(request.input('mobile')){    
//         //     const validation =  await validateAll(request.all(),{
//         //         mobile: 'required',
//         //         password: 'required'
//         //     })
//         //       if (validation.fail()){
//         //        session.withErrors(validation.message()).flashExcept(['password'])
//         //        return "mobile failed"
//         //    }
//         console.log("mobile");
//         let {
//             mobile,
//             password
//         } = request.all();
        
//            const token = await auth.attempt(mobile, password)
//                return token;
      
//           } 
//      }
// }

module.exports = UserController
