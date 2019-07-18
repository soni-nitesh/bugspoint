<template>
    <v-container fluid style='margin-top:40px;'>
        
         <v-layout row wrap>
             <!-- map view -->
             <v-flex md6 xs12>
                 <GoogleMap style='height:90vh;' v-if='flag' class='w-95 mx-auto'/>
             </v-flex>
             <!-- cards showing details -->
             <v-flex md6 xs12 mt-4 >
                  <v-card
                        max-width="600"
                        class="mx-auto rounded-card"
                    >
                      <h3 class='text-center pt-2'>{{ data.description }}</h3>
                        <v-layout
                        pt-2
                        pb-3
                        pl-3
                        >
                        <v-flex shrink>
                            <v-dialog v-model="dialog" persistent color="cyan lighten-1" justify-center width="800px" height="800px" >
      <template v-slot:activator="{ on }">
                       <v-img mb-3 
                            height="180"
                            v-on="on"
                            width="180"
                            class='img-fluid'
                            contain
                            :src="imageSrc + data.image"
                            ></v-img>
      </template>
                         <v-flex xs12 md12>
                           <v-img
                            height="500px"
                            contain                           
                            aspect-ratio="1"
                            width="800px"
                            :src="imageSrc + data.image"
                            ></v-img> 
                            <v-btn block  @click="dialog = false">Close</v-btn>
                             </v-flex>
                            </v-dialog>
                        </v-flex>
                        <v-flex >
                            <v-layout
                            grid-list-lg
                            pa-2
                            >
                            <v-layout column class='mt-3 ml-4'>
                                <v-flex pt-2>                                
                                <b>category</b> : {{data.category}}
                                </v-flex>
                                <v-flex pt-2>
                                <b>Address</b> : current address
                                </v-flex>
                                <v-flex pt-2>
                                <b>Date</b> : {{ data.updated_at }}
                                </v-flex>
                                <v-flex pt-2>
                                <b>Status</b> : new
                                </v-flex>
                                <v-flex pt-2>
                                <b>Posted By</b> : {{ data.user_name }}
                                </v-flex>
                            </v-layout>
                            </v-layout>
                        </v-flex>
                        </v-layout>
                    </v-card>
             <v-flex class='mt-3'>
                    <v-card
                        max-width="600"
                        class="mx-auto"
                    >
                        <v-card-title><b><span class='headline'>Supporters : </span><span class='display-1'> {{ likes}} </span></b>
                        <v-btn icon  @click='likePost'>
                            <v-icon v-bind:style="{ color: color}">thumb_up</v-icon>
                            </v-btn>
                        </v-card-title>
                         <social-sharing url="http://localhost:8080/bug/2"
                            title="The Progressive JavaScript Framework"
                            description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                            quote="Vue is a progressive framework for building user interfaces."
                            hashtags="vuejs,javascript,framework"
                            twitter-user="vuejs"
                            inline-template >
                     <div style='font-size:50px'>
                    <network network="facebook" class='pl-3' >
                        <i class="fa fa-facebook-square" style='color:blue'></i>
                    </network>
                    <network network="twitter" class='pl-3'>
                        <i class="fa fa-twitter-square" style='color:#38A1F3'></i> 
                    </network>
                    <network network="whatsapp" class='pl-3'>
                        <i class="fa fa-whatsapp" style='color:green'></i>
                    </network>
                    </div>
                    </social-sharing>
                    </v-card> 
              </v-flex>             
             </v-flex>
         </v-layout>
         <div>
              <v-card                    
                    class="mx-auto mt-3"
                >
                    <v-card-title>Add Comment</v-card-title>                    
                        <v-flex>
                        <v-textarea
                        class="mx-2"
                        label="comment"
                        rows="1"
                        prepend-icon="comment"
                        v-model="commentText"
                        ></v-textarea>
                        <v-btn  text color="#27C59B" @click='comment' >Comment</v-btn>
                        </v-flex>                    
             </v-card>
         </div>
         <div>

                    <v-layout row>
    <v-flex xs12 sm12 class='mt-2 '>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.userName"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.comment"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>


         </div>
    </v-container>
</template>

<script>
import store from './../store'
import GoogleMap from "./../components/viewBugMap";
import axios from 'axios'
import router from '../router'
import HTTP from '../http' 
export default {
    props: ["id"],
  components: {
      GoogleMap,
    },
    data(){
        return{
            likes: 0,
            dialog: false,
            data: {},
            flag : 0 ,
            color: '',
            commentText:'',
            imageSrc : 'http://127.0.0.1:3333/uploads/blogPicture/',
             items: [ ]
        }
    },
    beforeMount() {
        this.getData();
        console.log(this.id);
    },
    methods: {
    async getData(){
         let data = new FormData()
         data.append('id', this.id)
         let options = {
                    headers: {
                    'content-type': 'form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/getParticularPostData'
         
         await HTTP().post(url ,data ,options).then((data)=>{
                this.data = data.data
                console.log(this.data)
                store.state.particularPostLat = this.data.lat ;
                store.state.particularPostLng = this.data.lng 
                this.flag=1;
               }) 
              await this.viewlikes();
              await this.viewComment(); 
     },
    async  likePost(){
         let data = new FormData()         
         data.append('id', this.id)
         if(!localStorage.getItem('token'))
         {
             alert('You must login first')
             return 0;
         }
         data.append('token',localStorage.getItem('token'))
         let options = {
                    headers: {
                    'content-type': 'form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/likePost'
         await HTTP().post(url ,data ,options).then((data)=>{
                console.log(data.data);
                this.likes = data.data.count ;
                  
     })
        this.viewlikes();
    },
    viewlikes(){
         let data = new FormData()         
         data.append('id', this.id)
         if(!localStorage.getItem('token'))
         {
             data.append('token',1)
         }
         else
         {
         data.append('token',localStorage.getItem('token'))
         }
         let options = {
                    headers: {
                    'content-type': 'form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/viewlikes'
          HTTP().post(url ,data ,options).then((data)=>{
              this.likes = data.data[1];
              if(data.data[0] == -1)
              {
                  this.color = 'grey'
              }else
              {
                  this.color = 'blue'
              }                  
    })
    },
    async comment(){
        if(this.commentText == '')
        {   alert('please write comment');
            return 0;
        }
        if(!localStorage.getItem('token'))
         {
             alert('You must login first')
             return 0;
         }
        let data = new FormData()         
         data.append('id', this.id)
         data.append('token',localStorage.getItem('token'))
         data.append('commentText',this.commentText)
         this.commentText = ''
         let options = {
                    headers: {
                    'content-type': 'form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/commentPost'
         await HTTP().post(url ,data ,options).then((data)=>{
                console.log(data.data);
                this.likes = data.data.count ;                  
     })      
     this.viewComment(); 
    },
    viewComment(){
        let data = new FormData()         
         data.append('id', this.id)
         let options = {
                    headers: {
                    'content-type': 'form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/viewComment'
          HTTP().post(url ,data ,options).then((data)=>{
              this.items = [];
              this.items.push({ header: 'Comments' });
              for(var i=0;i<data.data.length;i++)
              {
                  this.items.push(data.data[i])
                  this.items.push({ divider: true, inset: true })
              }                             
    })
    }
}
}
</script>

<style>

</style>
