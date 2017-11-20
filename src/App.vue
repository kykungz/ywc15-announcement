<template>
  <div class="app">
    <transition name="fade">
      <div @click="backToTop" v-if="showing"
        class="d-flex align-items-center justify-content-center floating-button"
      >
        <icon class="text-center" name="angle-up" scale="2.4"></icon>
      </div>
    </transition>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { API_URL } from '@/libraries/constants'

export default {
  name: 'app',
  data () {
    return {
      showing: false
    }
  },
  async mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.setResult((await axios.get(API_URL)).data)
    this.setLoading(false)
  },
  methods: {
    ...mapActions(['setResult', 'setLoading']),
    handleScroll () {
      this.showing = window.scrollY >= 500
    },
    backToTop () {
      this.$SmoothScroll(document.body, 500)
    }
  }
}
</script>

<style>
.app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*color: #dddddd;*/
  font-family: 'Kanit', sans-serif;
}

.floating {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.datepicker-input {
  color: cornflowerblue;
  cursor: pointer;
  background: none;
  font-weight: 300;
  border: none;
  padding: 0;
  border-bottom-width: 4px;
  border-bottom-style: dotted;
  border-bottom-color: black;
  width: 8.6em;
  transition: all 300ms;
}

.datepicker-input:hover {
  filter: brightness(130%);
}

.light {
  font-weight: 200;
}

.medium {
  font-weight: 300;
}

.floating-button {
  position: fixed;
  cursor: pointer;
  bottom: 30px;
  right: 30px;
  background-color: #ffc700;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: white;
  transition: all 400ms;
  z-index: 10;
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
