import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';

Vue.use(VueLazyload);
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
});
