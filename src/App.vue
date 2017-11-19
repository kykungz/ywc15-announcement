<template>
  <div class="app">
    <back-to-top class="floating-button" text="⌃"></back-to-top>

    <div class="text-center">
      <img style="max-height: 90px; margin: 20px;" class="img-fluid logo" src="static/images/logo-black.png" alt="">
    </div>

    <router-view/>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'

export default {
  name: 'app',
  components: { BackToTop }
}
</script>

<style>
.app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*color: #dddddd;*/
  font-family: 'Kanit', sans-serif;
}

.floating-button {
  background-color: #ffc700 !important;
  border-radius: 200px !important;
  width: 50px !important;
  height: 50px !important;
  font-size: 36px;
  padding-top: 17px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  transition: all 400ms;
  bottom: 30px !important;
}

.floating-button:hover {
  filter: brightness(0.95);
  transform: translateY(4px);
}

.logo {
  max-height: 90px;
  margin: 20px;
}
</style>
