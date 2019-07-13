<template>
<div>
    <v-layout style='margin-top:50px'>
      <google-map />
    </v-layout>
  
</div>
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
              address: ''
            }
  },


  }
</script>
