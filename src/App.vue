<template>
  <div class="app">
    <div class="text-center">
      <img style="max-height: 90px; margin: 20px;" class="img-fluid logo" src="static/images/logo-black.png" alt="">
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
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*color: #dddddd;*/
  font-family: 'Kanit', sans-serif;
}

.logo {
  max-height: 90px;
  margin: 20px;
}
</style>
