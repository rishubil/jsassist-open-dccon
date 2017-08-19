<template>
  <div class="column col-xs-12 col-lg-10 col-10 columns dccon-list">
    <dccon v-for="dccon in dcconList" :key="dccon.path" :dccon="dccon"></dccon>
  </div>
</template>


<script>
  import Dccon from './Dccon';

  export default {
    name: 'dcconList',
    props: {
      dcconList: {
        type: Array,
        default: [],
      },
    },
    components: {
      Dccon,
    },
    data() {
      return {
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
