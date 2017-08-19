<template>
  <div class="toast toast-primary">{{text}}</div>
</template>


<script>
  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'toast',
    props: {
      text: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .toast {
    margin-top: 8px;
  }
</style>
