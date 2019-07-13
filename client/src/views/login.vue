<template>
<v-layout row   wrap mt-5>
<v-dialog v-model="dialog" persistent max-width="600px" max-height="800px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Signin <v-icon>people</v-icon> </v-btn>
      </template> -->
      <v-card>
     <v-flex>
       <v-btn  @click="flag = true" dark color="teal"> Login<v-icon dark>face</v-icon> </v-btn>
       <v-btn  @click="flag = !flag" dark color="teal"> Signup<v-icon dark>people</v-icon> </v-btn> 
      <v-btn  @click="home"  fab dark small color="teal">    <v-icon dark>remove</v-icon>
    </v-btn></v-flex>
  
          <v-card v-if="flag">
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
                :rules="logRules"
                required
                ></v-text-field>
                 </v-content>
                <!-- input password -->
                <v-content>
                <v-text-field type="password"
                v-model="lpassword"
                :rules="lpasswordrules"
                label="password"
                required
                ></v-text-field>   
                   </v-content>
                <v-btn @click="validlog" color="success" >
                Login
                </v-btn>
            </v-form>
            </v-card-text>
         </v-card>
      <v-card v-if="!flag">
        <v-card-title primary-title> 
            <div   class="headline">Register</div>
        </v-card-title>
            <v-card-text>
            <v-form 
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <!-- input name -->
                <v-content>
                <v-text-field
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
                ></v-text-field>
                 </v-content>
                <!-- input phone number -->
                <v-content>
                <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone"
                required
                ></v-text-field>
                <p v-if="mflag" style="color:red">{{mobile_error}}</p>
                </v-content>
                
                <!-- input email address -->
                <v-content>
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
                <p v-if="eflag" style="color:red">{{email_error}}</p>
                 </v-content>
                <!-- input password -->
                <v-content>
                <v-text-field
                type="password"
                v-model="password"
                :rules="passwordRules"
                label="password"
                required
                ></v-text-field>   
                </v-content>
                <v-btn :disabled="!valid" color="success"  @click="validate">
                Register
                </v-btn>
            </v-form>
            </v-card-text>
         </v-card>
         </v-card>
    </v-dialog>
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
      email_error:'',
      mflag: false,
      eflag:false,
      mobile_error:'',
      flag : true,
      dialog: false,
      valid: true,
      log:'',
      lpassword: '',
      password:'',  
      valid: true,
      dvalid:'',
        logRules: [
        v => !!v || 'Required'],
        lpasswordrules: [
        v => !!v || 'Required'],
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => (v && v.length == 10) || 'Phone Number should be 10 number'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 4) || 'password must be greater than 4 characters'
      ],
      }),
       created() {

    this.dialog = true,

    console.log('propertyComputed will update, as this.property is now reactive.')

  },
    component :{
      ...mapActions([
        'login_logout'
      ])
    },
    methods: {
       login(){
         console.log('test');
      return HTTP().post("/login",{
      password:this.lpassword,
      log:this.log,     
   }).then((data)=>{
<<<<<<< HEAD
     if(data.data){
     localStorage.setItem('token',data.data.token)
     store.dispatch('login_logout');
     this.$router.push({name:'home'})
   }
   else{
    alert("user not found")
   }})
    },
=======
     console.log(data)
     localStorage.setItem('token',data.data)
     store.dispatch('login_logout');
     this.$router.push({name:'home'})
   })
    }, 
>>>>>>> d11fad6d64fad42bee5309eda4004a4d52cd07d3
    validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.sendData() ;
        }
      },
      validlog() {
        if (this.$refs.form.validate()) {
          this.login() ;
        }
      },
       sendData(){
         this.flag =true
      return HTTP().post("/register",{
      email:this.email,
      password:this.password,
      name:this.name,
      mobile:this.phone,      
   }).then((data)=>{
     console.log(data);
     if(data.data == 1){ 
       this.eflag = true;
       this.email_error = "Email is already registered";
     }
       if(data.data == 2){ 
         this.mflag = true;
        this.mobile_error = "Mobile is already registered";
         }
     else{
     this.$router.push({name:'login'})
        }
   })
     },
     home(){
       this.$router.push({name:'home'})
     }
    }
  }
</script>

<style>

</style>
