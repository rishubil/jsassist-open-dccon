import Vue from 'vue';
import Router from 'vue-router';
import List from '@/components/list/List';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'index', redirect: {name: 'list'}},
    {path: '/list', name: 'list', component: List, props: route => ({dccon_list_url: route.query.dccon_list})},
  ],
});
