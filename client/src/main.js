import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync' ; 
import * as VueGoogleMaps from "vue2-google-maps";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDHVcmBcT8vaS5tFgJqouSc20tfPyJp8z0",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;
sync(store,router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
