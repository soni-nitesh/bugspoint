<template>
    <v-container  fluid mt-5>
       <v-layout text-xs-center ma-5 row>
      <v-flex
        grow
        pa-1
      >
        <v-card
          class="display-1"
          dark
          color=""
        >
          <v-card-text >My Profile</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
      <v-layout row >
          <v-flex xs12 md3 pa-3> 
               <v-card >
          <v-card-text class="pa-2">
              <v-list>
                  <v-subheader>Main</v-subheader>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon  color="grey">notification_important</v-icon>
              </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Notification</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
                    <v-list-tile @click="profile = true; bugd = false">
          <v-list-tile-action>
              <v-icon  color="grey">person</v-icon>
              </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Edit Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
              <v-icon  color="grey">lock</v-icon> </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Change Password</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider></v-divider>
              <v-list>
                  <v-subheader>Bugs</v-subheader>

          <v-list-tile @click="bugd = true, profile= false">
            <v-list-tile-action>
              <v-icon  color="grey">list</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>My Bugs</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
            <v-list-tile  to='/addbug' router>
            <v-list-tile-action>
              <v-icon  color="grey">add_circle</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Add Bug</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
         <v-btn rounded @click="logout_function" outline large dark color="teal">Sign Out</v-btn>
        </v-list>
          </v-card-text>
        
        </v-card>
        </v-flex>
        <v-flex xs12 md9 pa-3>
        <v-card height="500px" v-if="!bugd && !profile">
            <v-subheader>My Notification</v-subheader>
          <v-card-text></v-card-text>
        </v-card>
        <v-card v-if="bugd">
            <v-subheader>My Bugs</v-subheader>
            <v-layout row pa-2>
               <v-flex xs12 md4  pa-3 v-for="(data, index) in data" :key="index">
           <v-hover>
      <v-card mt-2
       slot-scope="{ hover }"
       class="mx-auto rounded-card"
       :class="`elevation-${hover ? 12 : 2}`"
       color="grey lighten-4"
    >
      <v-img          
          id="iamge"
          class=''
          contain
          aspect-ratio="1.9"
          :src="imageSrc + data.image"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out cyan darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            <v-btn small @click='goToPost(data.id)'>Know More</v-btn>
      </div>
      </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-4"
        style="position: relative;"
      >
        <v-btn
          absolute
          color="cyan darken-1"
          class="white--text"
          small
          right
          top
          @click='deletePost(data.id)'
        >
          <v-icon class='text-none' small  >delete</v-icon>
        </v-btn>
        <h6 class="subheading font-weight-light cyan--text mb-2">{{data.description}}</h6>
        <div class="font-weight-light title mb-2">
        {{data.category}}
        </div>
      </v-card-text>
          </v-card>
       </v-hover>
               </v-flex>
               </v-layout>
        </v-card>
        <v-card>
        <v-flex pa-4 md9 xs12 v-if="profile" >
          <v-subheader>Edit Profile</v-subheader>
           <form >
  <div class="form-row">
    <div class="col-md-12 mb-3">
      <label for="validationServer01">Name</label>
      <input type="text" class="form-control" v-model="name" required>

    </div>
    <div class="col-md-12 mb-3">
      <label for="validationServerUsername">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" aria-describedby="inputGroupPrepend3" required>
      </div>
    </div>
    <div class="col-md-12 mb-3">
      <label for="validationServerUsername">Mobile no.</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="mobile" aria-describedby="inputGroupPrepend3" required>
      </div>
    </div>

  </div>
  <div class="form-row">
    <div class="col-md-12 mb-3">
      <label for="validationServer03">Birth Date</label>
      <input type="date" v-model="dob" class="form-control">
    </div>
  </div>
    <div class="form-row">
    <div class="col-md-12 mb-3">
 <select class="custom-select mr-sm-2"  v-model="gender">
        <option disabled value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>

      </select>
 </div>
  </div>
  				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
                    <v-text-field label="Profile Picture" @click='pickFile' v-model='imageName'  prepend-icon='attach_file' ></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked">
				</v-flex>

  <button class="btn btn-primary" type="submit" @click="sendData">Submit</button>
</form>
        </v-flex>
        </v-card>
      </v-flex>
      </v-layout>
     </v-container>
</template>

<script>
import GoogleMap from "./../components/addBugMap";
import login from "./login";
import axios from 'axios'
import router from '../router'
import HTTP from '../http'
import store from "../store"
export default {
      data () {
      return {
       data:[],
       imageSrc:'http://127.0.0.1:3333/uploads/blogPicture/',
       profile:false,
       bugd: false,
       name:'',
       email:'',
       dob: '',
       gender: '',
       imageName: '',
		   imageUrl: '',
       imageFile: '',
       image:'',
       mobile:''
      }
    },
     created() {
      var bugd = localStorage.getItem('bugd');
         this.getUserPost();
         this.editprofile();
    },
     methods: {
   async getUserPost(){
       
      let data = new FormData()
                 data.append('token',localStorage.getItem('token'))
                let url = 'http://127.0.0.1:3333/getUserPost'                
  await HTTP().post(url, data).then((data)=>{
        this.data = [...data.data];
        
  })    },
   async sendData(){
               let data = new FormData()
                 data.append('name', this.name)
                 data.append('email',this.email)
                 data.append('gender',this.gender)
                 data.append('dob',this.dob)
                 data.append('image',this.image)
                 data.append('mobile',this.mobile)
                 data.append('id',this.id)
                let url = 'http://127.0.0.1:3333/updateprofile'
                let options = {
                    headers: {
                    'content-type': 'multipart/form-data'
                    }
                }
                
  await HTTP().post(url, data, options).then((data)=>{
     localStorage.setItem('token', data.data);
      this.$router.push({name:'home'})
  }) 
},
    goToPost(id){
      this.$router.push({name:'bug' , params: { id: id }})
    },
    async deletePost(id){

          let data = new FormData()
                 data.append('id',id)

         let url = 'http://127.0.0.1:3333/deletePost'               
    await HTTP().post(url,data).then((data)=>{
        var i ;
        var temp = [] ;
      for(i=0;i<this.data.length;i++)
      {
          if(this.data[i].id != data.data.id)
          {
              temp.push(this.data[i]);
          }

      }
      this.data = [...temp]

    })
    },
           pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
            this.image = e.target.files[0] ;
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},  
       logout_function(){
        localStorage.removeItem('token');
        store.dispatch('login_logout')
        this.$router.push({name:'home'})
      },
      async editprofile(){
        console.log('test');
        const token =   localStorage.getItem('token');
         let data = new FormData()
                 data.append('token',token);
               let options = {
                    headers: {
                    'content-type': 'multipart/form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/editprofile'               
    await HTTP().post(url,data,options).then((data)=>{
        this.id = data.data.id;
        this.name = data.data.name;
        this.mobile = data.data.mobile; 
        this.email = data.data.email; 
        this.gender = data.data.gender;
        this.dob= data.data.dob;
        this.imageName= data.data.image;
        if(this.imageName){
          this.imageUrl = 'http://127.0.0.1:3333/uploads/blogPicture/'+this.imageName
          }
    })
      },
      
}}
</script>

<style>

</style>
