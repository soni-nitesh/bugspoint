<template>
  <div style='margin-top:65px;'>
    <h1>hello world</h1>
    <img :src="image" class='img-fluid' />
    <h3 class='ml-4 pb-3 text-center'>Location</h3>
    <div style='height:350px;'>
    <Map style='height:350px;' class='w-75 mx-auto'/>
    </div>
   </div>    
</template>{{ assetsUrl('uploads/blogPicture/'+item.image)}}

<script>
import Map from './../components/viewBugMap'
 import axios from 'axios'
import router from '../router'
import HTTP from '../http'
import store from "../store"
export default {
  component:{
    Map
  },
  data(){
    return{
      image : ''
    }
  },
  mounted(){
    this.getPostData()
  },
  methods: {
    getPostData(){
      axios
      .get('http://127.0.0.1:3333/getPostData')
      .then( (data) => {
        console.log(data)
        var temp = 'http://127.0.0.1:3333/uploads/blogPicture/'
        this.image = temp.concat(data.data[0].image)
      })
      .catch(error => console.log(error))
    },
    
  },
 
}
</script>

<style>

</style>
