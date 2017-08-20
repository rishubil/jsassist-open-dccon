<template>
  <transition-group name="fadeUp" tag="div" class="toast-container">
    <toast v-for="toast in toasts" :key="toast.timestamp" :text="toast.text"></toast>
  </transition-group>
</template>


<script>
  import _ from 'lodash';
  import Bus from '@/bus';
  import Toast from './Toast';

  export default {
    name: 'toastContainer',
    components: {
      Toast,
    },
    data() {
      return {
        toasts: [],
      };
    },
    created() {
      Bus.$on('TOAST_MSG', this.toast);
    },
    methods: {
      toast(msg) {
        const now = _.now();
        this.toasts.push({
          timestamp: now,
          text: msg,
        });
        const t = this;
        // eslint-disable-next-line prefer-arrow-callback
        _.delay(function f() {
          t.toasts = _(t.toasts).filter(v => v.timestamp !== now).value();
        }, 3000);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .toast-container {
    position: fixed;
    bottom: 0px;
    right: 0px;
    padding: 16px;
    z-index: 400;
  }
</style>
