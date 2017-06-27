<template>
  <div
    class="dccon column col-xs-6 col-md-4 col-lg-3 col-xl-2 col-2 tooltip tooltip-bottom"
    :data-keyword="keyword"
    :data-tags="dccon.tags.join(', ')"
    :data-clipboard-text="'~' + keyword"
    :data-tooltip="dccon.keywords.join(', ')">
    <div class="card">
      <div class="card-image">
        <img
          class="img-responsive width100 lazy" :src="dccon.path">
      </div>
      <div class="card-body">{{ keyword }}</div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'dccon',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.card {
  border-width: 0px;
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
  transform: translate(-50%, -81px);
}

</style>
