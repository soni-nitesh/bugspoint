'use strict'

const Encryption = use('Encryption')
const Post = use('App/Models/Post')
const User = use('App/Models/Post')
const Helpers = use('Helpers')
class PostController {
    async addPost({request}){     
         console.log('test');
         const token = request.input('token')        
         const description = request.input('description')
         const category =  request.input('category')
         const lat =  request.input('lat')
         const lng = request.input('lng')
         const decrypted = Encryption.decrypt(token)
         const user_id = decrypted.id
         const user_name = decrypted.name
         const profilePic = request.file('image', {
            types: ['image'],
            size: '2mb'
          })
         
          if(decrypted == null)
          return 0 ;
          const image = new Date().getTime()+'.'+profilePic.subtype
          await profilePic.move(Helpers.publicPath('uploads/blogPicture'), {
            name: image,
          })  
              console.log(description);         
          const post = await Post.create({
            user_id,
            user_name, 
            lat ,
            lng,
            description,
            category,
            image 
        }); 
           console.log(post);
           post.save();

    }
    async getPostData({request,response}){
      const post = await Post.all();
      console.log(post.toJSON());
      return response.send(post.toJSON());
    }
}

module.exports = PostController
