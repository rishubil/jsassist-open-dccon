<template>
  <div
    class="dccon column col-xs-6 col-md-4 col-lg-3 col-xl-2 col-2 tooltip tooltip-bottom"
    :data-tooltip="keywordString(dccon)" @click.prevent="click">
    <div class="card">
      <div class="card-image">
        <img
          class="img-responsive width100 lazy" v-lazy="dccon.path">
      </div>
      <div class="card-body">{{ dccon.keywords[0] }}</div>
    </div>
  </div>
</template>


<script>
  import _ from 'lodash';
  import Bus from '@/bus';

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'dccon',
    props: {
      dccon: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {};
    },
    methods: {
      keywordString(dccon) {
        return _.join(dccon.keywords, ', ');
      },
      click() {
        Bus.$emit('COPY_DCCON', this.dccon.keywords[0]);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .width100 {
    width: 100%;
  }

  .card {
    border-width: 0px;
    margin-bottom: 1rem;
  }

  .dccon {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
  }

  .card-body {
    height: 70px;
  }

  .dccon.tooltip::after {
    width: 100%;
    margin-left: 9px;
    margin-right: 9px;
    height: 72px;
    padding: 12px;
    padding-right: 28px;
    white-space: pre-line;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  .dccon.tooltip.tooltip-bottom:focus::after,
  .tooltip.tooltip-bottom:hover::after {
    opacity: 1;
    -webkit-transform: translate(-50%, -81px);
    -ms-transform: translate(-50%, -81px);
    transform: translate(-51%, -90px);
  }

</style>
