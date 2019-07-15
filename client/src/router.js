import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';  
Vue.use(Router);

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/signup.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/contact.vue'),
    },
    {
      path: '/addbug',
      name: 'addbug',
      component: () => import('./views/addBugs.vue'),
    },
    {
      path: '/bug/:id',
      name: 'bug',
      component: () => import('./views/bug.vue'), 
      props: true
    },

  ],
});
router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/');
    }
  }

  
  
  
  
 
  next();
});
export default router;