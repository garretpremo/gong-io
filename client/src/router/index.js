import Vue from 'vue';
import Router from 'vue-router';
import GongIo from '../components/gong-io';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GongIo',
      component: GongIo
    }
  ]
});
