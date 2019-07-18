'use strict'

const Encryption = use('Encryption')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Like = use('App/Models/Like')
const Comment = use('App/Models/Comment')
const Helpers = use('Helpers')
const fs = require('fs');

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
           const comment = await Comment.create({
             post_id : post.toJSON().id ,
             comment : JSON.stringify([])
           })   
           comment.save() ;
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
      if(request.input('token') == 1)
      {
        let like = await Like.findBy('post_id',request.input('id'));
        var arr = [-1 , like.count];
      return response.send(arr)
      }
      else
      {
      let like = await Like.findBy('post_id',request.input('id'));
      const token = Encryption.decrypt(request.input('token'))
      const user_id = token.id ;
      var temp = JSON.parse(like.user_id);
      var check = temp.indexOf(user_id);
      var arr = [check , like.count];
      return response.send(arr)
      }
    }
    async getUserPost({request,response}){
       const token =  request.input('token')
       const decrypted = Encryption.decrypt(token)
       const id = decrypted.id
      let post = await Post.query().where('user_id', id).fetch();
      return response.send(post.toJSON())

    }
    async deletePost({request}){       
        // const id = request.input('id');  
        let post = await Post.query().where('id',request.input('id')).first()
         const temp = post.toJSON(); 
         fs.unlink("./public/uploads/blogPicture/"+temp.image, (err) => {
          if (err) {
              console.log("failed to delete local image:"+err);
          } else {
              console.log('successfully deleted local image');                                
          }
        });
        await post.delete();
        const like = await Like.query().where('post_id',temp.id).first();
        await like.delete();
        const comment = await Comment.query().where('post_id',temp.id).first();
        await comment.delete();
        return temp;  
    }

    //Comment on post
    async commentPost({request,response}){
      const token =  request.input('token')
      const decrypted = Encryption.decrypt(token)
      const user_id = decrypted.id
      const commentText = request.input('commentText'); 
      const post_id = request.input('id');
      let comment = await Comment.findBy('post_id',post_id);
      var data ;
     
      if(decrypted.image)
      {
       data  = {'userId':user_id,'comment':commentText,'userName':decrypted.name,'avatar':'http://127.0.0.1:3333/uploads/blogPicture/'+decrypted.image} ;
      }
      else
      {
      data  = {'userId':user_id,'comment':commentText,'userName':decrypted.name,'avatar':'https://steemitimages.com/p/3HaJVw3AYyXBPPdfDwZuiZRFoYNWo5YFpjHs9b2Qx36AHvcSRbrj8zZWXz3iU5H1ob75cM844F6bQkhQDYpRmSYpbU5RE5xQLeCf5yg?format=match&mode=fit&width=640'} ;
      }
      var temp = JSON.parse(comment.comment);
      temp.push(data);
      comment.comment = JSON.stringify(temp);
      comment.save();
    }

    //print comment on particular post
   async viewComment({request,response}){
      let comment = await Comment.findBy('post_id',request.input('id'));  
      var temp = JSON.parse(comment.comment);
     return temp ; 
    }
}

module.exports = PostController
