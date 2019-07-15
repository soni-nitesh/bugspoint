import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL : "http://localhost:3333",
    login : true,
    logout: false,
    accessToken: null,
    addPost_lat: null,
    addPost_lng: null ,
    particularPostId: 1 ,
    particularPostLat: null ,
    particularPostLng : null
  },
  mutations: {
    login_logout(state){
      if(localStorage.getItem('token'))
      {
        state.logout = true ;
        state.login =  false ;
      }
      else{
        state.logout = false 
        state.login =  true 
      }
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
  },
  actions: {
    login_logout( context){
      context.commit('login_logout');
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('token'));
    },
  },
});
