'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
const Encryption = use('Encryption')
const Helpers = use('Helpers')
class UserController {

    async register({request})
    { 
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

       return 0
      }
      async editprofile({request, response}){
        const token = Encryption.decrypt(request.input('token'))

         const name = token.name;
         const email= token.email;
         const id =token.id;
         const mobile = token.mobile;
         const dob = token.dob;
         const gender = token.gender;
         const image = token.image;
         return response.send({id,image, gender ,dob, name, mobile, email});
      }
  

      async updateprofile({request}){
        console.log("test");  

        const id = request.input('id');
          const user = await User.query().where('id',id).first()
          const profilePic = request.file('image', {
            types: ['image'],
            size: '2mb'
          })
          console.log(profilePic)
          const image = new Date().getTime()+'.'+profilePic.subtype
          await profilePic.move(Helpers.publicPath('uploads/blogPicture'), {
            name: image,
           })     
    console.log(image);
          let {
          name,
          email,
          gender,
          dob,
          mobile
      } = request.all(); 
      user.name = name;
      user.email = email;
      user.gender = gender;
      user.mobile = mobile;
      user.dob = dob;
      user.image = image
        console.log(user); 
        user.save();
        const token =  Encryption.encrypt(user)
         
        return(token)   
        
      }

     }
    
module.exports = UserController
