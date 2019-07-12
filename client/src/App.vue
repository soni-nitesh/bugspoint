<template>
  <v-app>
    
    <v-content>
      <navbar />
     <router-view ></router-view>
    
    </v-content>
  </v-app>
</template>

<script>
import navbar from './components/navbar'
export default {
  name: 'App',
  components: {
    navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
