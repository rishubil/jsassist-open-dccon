import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';

Vue.use(VueLazyload);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
});
