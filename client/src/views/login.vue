<template>
<v-layout row   wrap mt-5>
    <v-flex md6 xs10 offset-md3 offset-xs1>
         <v-card >
        <v-card-title primary-title> 
            <div class="headline">LOGIN</div>
        </v-card-title>
            <v-card-text>
            <v-form 
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <!-- input email address -->
                <v-content>
                <v-text-field
                v-model="log"
                label="Phone Or Email"
                required
                ></v-text-field>
                 </v-content>
                <!-- input password -->
                <v-content>
                <v-text-field
                v-model="password"
                label="password"
                required
                ></v-text-field>   
                   </v-content>
                <v-btn @click="sendData" color="success" >
                Login
                </v-btn>
            </v-form>
            </v-card-text>
         </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'
import router from '../router'
import HTTP from '../http'
import store from "../store"
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      valid: true,
      log:'',
      password: '',
    }),
    component :{
      ...mapActions([
        'login_logout'
      ])
    },
    methods: {
       sendData(){
         console.log('test');
      return HTTP().post("/login",{
      password:this.password,
      log:this.log,     
   }).then((data)=>{
     localStorage.setItem('token',data.data.token)
     store.dispatch('login_logout');
     this.$router.push({name:'home'})
   })
    }
    
    
    }
  }
</script>

<style>

</style>
