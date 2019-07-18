'use strict'

const Encryption = use('Encryption')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Like = use('App/Models/Like')
const Helpers = use('Helpers')
class PostController {
    async addPost({request}){     
      
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
            const post = await Post.create({
            user_id,
            user_name, 
            lat ,
            lng,
            description,
            category,
            image 
        });       
           post.save();
           const like = await Like.create({
             user_id : JSON.stringify([]),
             post_id: post.toJSON().id,
             count : 0,
           })
           like.save();       
    }
    async getPostData({request,response}){
      const post = await Post.all();
      return response.send(post.toJSON());
    }

    //send particuLAR POST data 
    async getParticularPostData({request,response}){
      let post = await Post.query().where('id',request.input('id')).first()
      return response.send(post.toJSON())
    }
    async likePost({request,response}){
      let like = await Like.findBy('post_id',request.input('id'))      
      const token = Encryption.decrypt(request.input('token'))
      const user_id = token.id ;
      var temp = JSON.parse(like.user_id);
      var check = temp.indexOf(user_id);
      if(check == -1)
      {
      temp.push(user_id);
      like.count += 1 ;
      }
      else
      {
      like.count -= 1 ;
      temp.splice(check,1)
      }
      like.user_id = JSON.stringify(temp); 
      like.save();
      return response.send(like.toJSON())
    }
    async viewlikes({request,response}){
      let like = await Like.findBy('post_id',request.input('id'));
      const token = Encryption.decrypt(request.input('token'))
      const user_id = token.id ;
      var temp = JSON.parse(like.user_id);
      var check = temp.indexOf(user_id);
      var arr = [check , like.count];
      console.log(arr);
      return response.send(arr)
    }
    async getUserPost({request,response}){
       const token =  request.input('token')
       const decrypted = Encryption.decrypt(token)
       const id = decrypted.id
      let post = await Post.query().where('user_id', id).fetch();
      return response.send(post.toJSON())

    }
    async deletePost({request}){
      console.log('test');
       
        // const id = request.input('id');  
        let post = await Post.query().where('id',request.input('id')).first()
         const temp = post.toJSON();
        console.log(temp); 
        await post.delete();
        return temp;  
    }

}

module.exports = PostController
