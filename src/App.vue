<template>
  <div id="app">
    <Test1></Test1>
    <router-view/>
  </div>
</template>

<script>
  import Test1 from './components/SZG/Test1.vue'

  export default {
    components: {Test1},
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
