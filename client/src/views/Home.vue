<template>
<div>
    <v-layout style='margin-top:50px' row>
      <google-map />
       <v-flex xs12 md3 pa-3 ma-3>
       <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline">Bug Title</div>
            <span class="grey--text">Descririon</span>
          </div>
        </v-card-title>

        <v-card-actions>
   
          <v-btn flat>like</v-btn>
  
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
      </v-flex>      
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
              show: false,
              address: ''
            }
  },


  }
</script>
