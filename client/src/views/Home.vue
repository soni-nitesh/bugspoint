<template>
<v-container fluid>
    <v-layout style='margin-top:50px' row>
      <google-map />
   <v-flex xs12 md4 pa-3 v-for="(data, index) in data" :key="index">
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
        >
          <h6 icon class='text-none'> By : {{data.user_name}}</h6>
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
</v-container>
</template>

<script>
 import GoogleMap from "./../components/GoogleMap";
 import axios from 'axios'
import router from '../router'
import HTTP from '../http'
import store from "../store"

  export default {
    components: {
      GoogleMap
 
    },
    data: function () {
            return {
              more:false,
              show: false,
              address: '',
              imageSrc : 'http://127.0.0.1:3333/uploads/blogPicture/',
              data: [],
            }
  },
   created(){
         this.getPostData()
   },
  methods: {
   async getPostData(){
     await axios
      .get('http://127.0.0.1:3333/getPostData')
      .then( async (data) => {
        if(await data.data){
         this.data = await [...data.data];
          this.data.reverse();
         }
         } )
      .catch(error => console.log(error))     
    },
    goToPost(id){
      this.$router.push({name:'bug' , params: { id: id }})
    }
  },

}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  
  width: 100%;
}
.rounded-card{
    border-radius:20px;
}

</style>