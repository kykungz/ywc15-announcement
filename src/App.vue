<template>
  <div class="app">
    <div class="text-center">
      <img class="img-fluid logo" src="./assets/logo.png" alt="">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.logo {
  width: 210px;
  margin: 20px;
}
</style>
