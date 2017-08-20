<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'app',
  };
</script>

<style lang="scss">
  @import url('https://cdn.rawgit.com/openhiun/hangul/14c0f6faa2941116bb53001d6a7dcd5e82300c3f/nanumbarungothic.css');

  #app {
    min-height: 100%;
    font-family: 'Nanum Barun Gothic', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

