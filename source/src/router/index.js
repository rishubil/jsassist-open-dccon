import Vue from 'vue';
import Router from 'vue-router';
import List from '@/components/list/List';
import Chat from '@/components/chat/Chat';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'index', redirect: {name: 'list'}},
    {path: '/list', name: 'list', component: List, props: route => ({dccon_list_url: route.query.dccon_list})},
    {path: '/chat', name: 'chat', component: Chat, props: route => ({dccon_list_url: route.query.dccon_list})},
  ],
});
