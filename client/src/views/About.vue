<template>
  <div>helo
    <img src='' class='img-fluid' />
    </div>
</template>

<script>
 import axios from 'axios'
import router from '../router'
import HTTP from '../http'
import store from "../store"
export default {

  mounted(){
    this.getPostData()
  },
  methods: {
    getPostData(){
      axios
      .get('http://127.0.0.1:3333/getPostData')
      .then(response => (
        console.log(response)
        ))
      .catch(error => console.log(error))
    },
    
  },
 
}
</script>

<style>

</style>
