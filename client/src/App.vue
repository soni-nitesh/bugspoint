<template>
  <v-app>
    <v-content>
      <navbar />
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import navbar from './components/navbar'
export default {
  name: 'App',
  components: {
    HelloWorld,
    navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
