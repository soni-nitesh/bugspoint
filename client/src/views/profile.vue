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

          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
            @click=""
          >
            <v-list-tile-action>
              <v-icon  color="grey">{{item.icon}}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider></v-divider>
              <v-list>
                  <v-subheader>Bugs</v-subheader>

          <v-list-tile @click="bugd = true">
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
        <v-card height="500px" v-if="!bugd">
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
        items: [
          { icon: "notification_important", title: 'My Notification' },
          { title: 'Edit Profile', icon:'person'},
          { title: 'Change Password', icon:'lock' },
        ],
       bug: [
          { title: 'My Bugs', icon:'list' },
          { icon: "add_circle", title: 'Add Bug' },
       ],
       bugd: false,

      }
    },
     created() {
        this.getUserPost();
    },
     methods: {
   async getUserPost(){
       
      let data = new FormData()
                 data.append('token',localStorage.getItem('token'))
                let url = 'http://127.0.0.1:3333/getUserPost'                
  await HTTP().post(url, data).then((data)=>{
        this.data = [...data.data];
        
  })    },
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
     logout_function(){
        localStorage.removeItem('token');
        store.dispatch('login_logout')
        this.$router.push({name:'home'})
      }
}}
</script>

<style>

</style>
