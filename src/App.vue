<template>
  <div class="app">
    <transition name="fade">
      <b-btn @click="backToTop" v-if="showing" variant="warning" class="my-btn floating-button">
        <icon class="text-center" name="angle-up" scale="2.7"></icon>
      </b-btn>
    </transition>
    <router-view/>
    <hr>
    <b-container>
      <p class="text-muted">Made by <a href="https://github.com/kykungz/ywc15-announcement">Kongpon C.</a></p>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { API_URL } from '@/libraries/constants'
import serviceWorker from '@/libraries/serviceWorker'
export default {
  name: 'app',
  data () {
    return {
      showing: false
    }
  },
  async created () {
    serviceWorker.init()

    try {
      const response = (await axios.get(API_URL)).data
      console.log(response)
      const cutoffs = {
        'CT': 'CT25',
        'DS': 'DS20',
        'MK': 'MK18',
        'PG': 'PG23'
      }
      const result = response
        .sort((a, b) => a.interviewRef.localeCompare(b.interviewRef))
        .map(candidate => {
          const time = candidate.interviewRef <= cutoffs[candidate.interviewRef.substring(0, 2)]
            ? 'เช้า'
            : 'บ่าย'
          return { ...candidate, time }
        })
      window.localStorage.setItem('result', JSON.stringify(result))
      this.setResult(result)
    } catch (e) {
      this.setResult(JSON.parse(window.localStorage.getItem('result')) || [])
    }

    this.setLoading(false)
  },
  async mounted () {
    // prevent autoscroll to previous position when refesh
    if ('scrollRestoration' in history) {
      if (this.$route.query.id) {
        history.scrollRestoration = 'manual'
        this.$SmoothScroll(document.body.scrollHeight, 500)
      } else {
        history.scrollRestoration = 'auto'
      }
    }

    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions([
      'setResult',
      'setLoading'
    ]),
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
  font-family: 'Kanit', sans-serif;
}

.my-btn {
  cursor: pointer;
  text-align: center;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 300ms !important;
}

.my-btn:hover {
  transform: translateY(2px);
}

.floating-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  border-radius: 27px !important;
  width: 54px;
  height: 54px;
  color: white !important;
  z-index: 4;
  padding-top: 0.2em !important;
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
  font-weight: 200 !important;
}

.medium {
  font-weight: 300 !important;
}

.logo {
  max-height: 90px;
  margin: 20px;
}
</style>
