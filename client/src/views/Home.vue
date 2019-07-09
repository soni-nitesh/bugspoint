<template>
<v-layout>
  <google-map />
  </v-layout>
</template>

<script>
 import GoogleMap from "./../components/GoogleMap";
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
