<template>
  <div id="app">
    <img src="./assets/logo.png">
    <dccon></dccon>
  </div>
</template>

<script>
import Dccon from './components/Dccon'

export default {
  name: 'app',
  components: {
    Dccon
  }
}
</script>

<style>
@import "~spectre.css/dist/spectre.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
