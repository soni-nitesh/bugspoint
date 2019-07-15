<template>
  <div id='map' style='width:100%;' >
    <gmap-map
      :center="center"
      :zoom="17"
      class="mw-100 h-100"
      :options="{scrollwheel: true}"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      
      ></gmap-marker>
    </gmap-map>
    <br><br><br><br><br><br><br>
    <div v-for="address in formatedAddresses" :key="address">{{ address }}</div>  
  </div>
</template>

<script>
import store from "../store"
export default {
  name: "GoogleMap",

  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
       formatedAddresses: [],
       lat: null,
       lng: null,
       flag: false
    };
  },

  mounted() {
      this.geolocate();
  },

 
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
        
        const marker = {
          lat: this.lat,
          lng: this.lng
        };
        store.state.addPost_lat = this.lat ;
        store.state.addPost_lng = this.lng ;
        
        if(this.flag == false)
        {            
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
       // this.center = marker;
        this.currentPlace = null;
        this.flag = true ;
        }
        else
        {
          this.markers.pop();
          this.places.pop();
           this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
      //  this.center = marker;
        this.currentPlace = null;
        this.flag = true ;
        }
    },
    geolocate: function() {
      
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: store.state.particularPostLat,
          lng: store.state.particularPostLng
        };
       
        this.lat = parseFloat(store.state.particularPostLat);
        this.lng = parseFloat(store.state.particularPostLng);
        this.addMarker();
      });
    console.log(this.center.lng)
    },
    
  }
};
</script>