<template>
  <div id='map' style='width:100%; height: 90vh;' >
    <gmap-map
      :center="center"
      :zoom="13"
      class="mw-100 h-100"
      @click='test'
      :options="{scrollwheel: true}"
        type="satellite"
        name="satellite-example"
   
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
       :icon="{ url: require('./../../public/marker_red.png')}"
      >
      </gmap-marker>
    </gmap-map>
    <br><br><br><br><br><br><br>
    <div v-for="address in formatedAddresses" :key="address">{{ address }}</div>  
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
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
       flag: false,
       data:[],
        image : 'https://bugs.city/web/images/marker_red.png'

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
        
      
        for(var i=0; i<this.data.length;i++)
        {
          this.markers.push({position:this.data[i],})
        }
       // this.markers.push({ position: marker });
        //this.places.push(this.currentPlace);
        
      //  this.center = marker;
       // this.currentPlace = null;
 
    },
    geolocate: function() {
      
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
          this.getAllBugsLocation();
    },
    test:function(markerobject){
      var location = { 
                lat : parseFloat(markerobject.latLng.lat()),
                lng : parseFloat(markerobject.latLng.lng())
            } ;
            this.lat =  parseFloat(markerobject.latLng.lat());
            this.lng =  parseFloat(markerobject.latLng.lng());
  
    },
    async getAllBugsLocation(){
    await axios
      .get('http://127.0.0.1:3333/getAllBugsLocation')
      .then( async (data) => {
        this.data = data.data;
        this.addMarker();
         })
      .catch(error => console.log(error)) 
  }
  },
  
};
</script>