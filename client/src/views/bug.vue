<template>
    <v-container fluid style='margin-top:40px;'>
        
         <v-layout row wrap>
             <!-- map view -->
             <v-flex md6 xs12>
                 <GoogleMap style='height:90vh;' v-if='flag' class='w-95 mx-auto'/>
             </v-flex>
             <!-- cards showing details -->
             <v-flex md6 xs12 mt-4 >
                  <v-card
                        max-width="600"
                        class="mx-auto rounded-card"
                    >
                      <h3 class='text-center pt-2'>{{ data.description }}</h3>
                        <v-layout
                        pt-2
                        pb-3
                        pl-3
                        >
                        <v-flex shrink>
                            <v-img
                            height="180"
                            width="180"
                            class='img-fluid'
                            :src="imageSrc + data.image"
                            ></v-img>
                        </v-flex>
                        <v-flex >
                            <v-layout
                            grid-list-lg
                            pa-2
                            >
                            <v-layout column class='mt-3 ml-4'>
                                <v-flex pt-2>                                
                                <b>category</b> : {{data.category}}
                                </v-flex>
                                <v-flex pt-2>
                                <b>Address</b> : current address
                                </v-flex>
                                <v-flex pt-2>
                                <b>Date</b> : {{ data.updated_at }}
                                </v-flex>
                                <v-flex pt-2>
                                <b>Status</b> : new
                                </v-flex>
                                <v-flex pt-2>
                                <b>Posted By</b> : {{ data.user_name }}
                                </v-flex>
                            </v-layout>
                            </v-layout>
                        </v-flex>
                        </v-layout>
                    </v-card>
             <v-flex class='mt-3'>
                    <v-card
                        max-width="600"
                        class="mx-auto"
                    >
                        <v-card-title><b><span class='headline'>Supporters : </span><span class='display-1'> 5 </span></b><v-btn icon disabled>
                            <v-icon>thumb_up</v-icon>
                            </v-btn>
                        </v-card-title>
                         <social-sharing url="http://localhost:8080/bug/2"
                            title="The Progressive JavaScript Framework"
                            description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                            quote="Vue is a progressive framework for building user interfaces."
                            hashtags="vuejs,javascript,framework"
                            twitter-user="vuejs"
                            inline-template >
                     <div style='font-size:50px'>
                    <network network="facebook" class='pl-3' >
                        <i class="fa fa-facebook-square" style='color:blue'></i>
                    </network>
                    <network network="twitter" class='pl-3'>
                        <i class="fa fa-twitter-square" style='color:#38A1F3'></i> 
                    </network>
                    <network network="whatsapp" class='pl-3'>
                        <i class="fa fa-whatsapp" style='color:green'></i>
                    </network>
                    </div>
                    </social-sharing>
                    </v-card> 
              </v-flex>             
             </v-flex>
         </v-layout>
         <div>
              <v-card                    
                    class="mx-auto mt-3"
                >
                    <v-card-title>Add Comment</v-card-title>                    
                        <v-flex>
                        <v-textarea
                        class="mx-2"
                        label="comment"
                        rows="1"
                        prepend-icon="comment"
                        ></v-textarea>
                        <v-btn  text color="#27C59B" >Comment</v-btn>
                        </v-flex>                    
             </v-card>
         </div>
         <div>
              <v-card                    
                    class="mx-auto mt-3"
                > 
                <v-card-title ><h5>Comment's</h5></v-card-title>
                <v-card-text></v-card-text>
                                             
             </v-card>
         </div>
    </v-container>
</template>

<script>
import store from './../store'
import GoogleMap from "./../components/viewBugMap";
import axios from 'axios'
import router from '../router'
import HTTP from '../http' 
export default {
    props: ["id"],
  components: {
      GoogleMap,
    },
    data(){
        return{
            data: {},
            flag : 0 ,
            imageSrc : 'http://127.0.0.1:3333/uploads/blogPicture/',
        }
    },
    beforeMount() {
        this.getData();
        console.log(this.id);
    },
    methods: {
    async getData(){
         let data = new FormData()
         data.append('id', this.id)
         let options = {
                    headers: {
                    'content-type': 'form-data'
                    }
                }
         let url = 'http://127.0.0.1:3333/getParticularPostData'
         
         await HTTP().post(url ,data ,options).then((data)=>{
                this.data = data.data
                console.log(this.data)
                store.state.particularPostLat = this.data.lat ;
                store.state.particularPostLng = this.data.lng ;
                console.log(store.state.particularPostLat);
                this.flag=1;
               }) 
     }        
    },
}
</script>

<style>

</style>
