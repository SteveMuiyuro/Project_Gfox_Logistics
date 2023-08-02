<template>
  <div id="app">
   <my-button></my-button>
  </div>
</template>

<script>
import myButton from './components/button'
export default {
  name: 'App',
  components:{myButton}
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
