<template>
<v-layout row   wrap mt-5>
    <v-flex md6 xs10 offset-md3 offset-xs1>
         <v-card >
        <v-card-title primary-title> 
            <div class="headline">Register</div>
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
                </v-content>
                <!-- input email address -->
                <v-content>
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
                 </v-content>
                <!-- input password -->
                <v-content>
                <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="password"
                required
                ></v-text-field>   
                </v-content>
                <v-btn :disabled="!valid" color="success"  @click="validate">
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
  export default {
    data: () => ({
      valid: true,
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

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.sendData() ;
        }
      },
       sendData(){
      return HTTP().post("/register",{
      email:this.email,
      password:this.password,
      name:this.name,
      mobile:this.phone,
     
   })
     }
    }
  }
</script>

<style>

</style>
