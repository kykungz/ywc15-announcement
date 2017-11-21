<template>
<div class="home">
  <!-- Welcome -->
  <div :style="bg" class="full-height">
    <div class="text-center">
      <img style="max-height: 90px; margin-top: 20px;" class="img-fluid logo" src="static/images/logo.png" alt="">
    </div>
    <div style="padding-top: 40px" class="center-block text-center container">
      <h1 class="display-5 light">สิ้นสุดการรอคอย !!</h1>
      <h1 style="padding-top: 40px" class="display-4 light">ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์</h1>
      <h2>โครงการ Young Webmaster Camp 15<sup>th</sup></h2>
      <span @click="jumpDown">
        <icon class="bounce" name="angle-down" style="margin-top: 60px" scale="5.4"></icon>
      </span>
    </div>
  </div>

  <!-- Information -->
  <information ref="info"></information>

  <!-- Search Bar -->
  <div ref="searchBar" class="search-bar sticky-top">
    <b-container>
      <b-input-group size="lg" class="position-relative">
        <b-input-group-addon class="search-icon">
          <icon name="search"></icon>
        </b-input-group-addon>

        <b-form-input v-model="search" class="search-input" placeholder="ค้นหาด้วย ชื่อ, รหัส, สาขา"></b-form-input>
        <span @click="reset()" class="remove-search">
          <icon v-show="search" name="times-circle" scale="1.4"></icon>
        </span>

        <b-button @click="speechToggle" variant="primary" class="my-btn speak-icon">
          <scale-loader v-if="listening" width="2px" height="16px" color="white"></scale-loader>
          <icon v-else name="microphone" scale="1.4"></icon>
        </b-button>
      </b-input-group>
    </b-container>
  </div>

  <!-- Candidate List -->
  <list v-show="search" :loading="loading" :major='`ผลการค้นหา "${search}"`' :list="filtered"></list>

  <div v-show="!search">
    <b-container class="major">
      <b-row class="text-center">
        <b-col v-for="(major, index) in ['content', 'design', 'marketing', 'programming']"
          cols="6" md="3" :key="index"
        >
          <img @click="scrollTo(`${major}Major`)"
            :src="`static/images/${major}.png`"
            width="160px"
            class="img-fluid rounded-circle dark-bg"
          >
          <br>
          <h4>{{ major.substr(0, 1).toUpperCase() + major.substr(1) }}</h4>
        </b-col>
      </b-row>
    </b-container>

    <list v-for="(major, index) in ['content', 'design', 'marketing', 'programming']"
      :key="index"
      :ref="`${major}Major`"
      :list="candidates[major]"
      :major="`Web ${major.substr(0, 1).toUpperCase() + major.substr(1)}`"
      :img="`static/images/${major}.png`"
    ></list>
  </div>

  <!-- Prank -->
  <prank :candidate="filtered.length === 1 ? filtered[0] : null"></prank>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { decrypt } from '@/libraries/functions'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import List from '@/components/List'
import Information from '@/components/Information'
import Prank from '@/components/Prank'

export default {
  name: 'Home',
  components: { List, Information, Prank, ScaleLoader },
  data () {
    return {
      // Use inline-style object to avoid webpack resolve incorrect URL
      bg: {
        background: `url('static/images/bg-front.png') repeat, url('static/images/bg.png') repeat`,
        backgroundSize: 'contain'
      },
      search: this.$route.query.id || '',
      exclude: decrypt(this.$route.query.result) || '',
      recognition: null,
      listening: false
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.$SmoothScroll(this.$refs.searchBar, 500)
    }
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        this.search = transcript.replace(/\s/g, '')
      }
      recognition.onend = (event) => { this.listening = false }
      recognition.onstart = (event) => { this.listening = true }
      this.recognition = recognition
    } catch (e) {
      this.$refs.speechToggle.disabled = true
    }
  },
  computed: {
    ...mapGetters([
      'result',
      'loading'
    ]),
    candidates () {
      return {
        content: this.filterMajor('content'),
        design: this.filterMajor('design'),
        marketing: this.filterMajor('marketing'),
        programming: this.filterMajor('programming')
      }
    },
    filtered () {
      if (this.search) {
        return this.result.filter(candidate =>
          Object.keys(candidate).some(key =>
            candidate[key].toLowerCase().includes(this.search.trim().toLowerCase())
          ) && candidate.interviewRef !== this.exclude
        )
      }
      return []
    }
  },
  methods: {
    speechToggle () {
      if (this.listening) {
        this.recognition.stop()
      } else {
        this.recognition.start()
      }
    },
    jumpDown () {
      this.$SmoothScroll(this.$refs.info.$el, 500)
    },
    scrollTo (target) {
      this.$SmoothScroll(this.$refs[target][0].$el.offsetTop - 80, 500)
    },
    reset () {
      this.search = ''
    },
    filterMajor (major) {
      return this.result.filter(candidate =>
        candidate.major === major && candidate.interviewRef !== this.exclude
      )
    }
  },
  watch: {
    '$route.query' (query) {
      this.search = query.id || ''
      this.exclude = decrypt(query.result) || ''
      this.$SmoothScroll(this.$refs.searchBar, 500)
    }
  }
}
</script>

<style scoped>
.home {
  margin-bottom: 180px;
}

.full-height {
  min-height: 100vh;
  color: white;
}

.major {
  margin: 30px auto;
}

.major img {
  cursor: pointer;
  box-shadow: 2px 1px 5px rgba(33, 39, 48, 0.6);
  margin-bottom: 6px;
  transition: all 300ms;
}

.major img:hover {
  transform: scale(0.9);
}

.dark-bg {
  background: rgb(33, 39, 48);
}

.search-bar {
  padding: 30px 0 10px 0;
  margin-bottom: 20px;
  background: white;
  z-index: 3;
}

.remove-search {
  position: absolute;
  color: darkgray;
  cursor: pointer;
  top: 13px;
  right: 70px;
  z-index: 3;
  transition: color 200ms;
}

.remove-search:hover {
  color: gray;
}

.search-input {
  border-radius: 0 20px 20px 0 !important;
  padding-right: 42px !important;
}

.search-icon {
  border-radius: 20px 0 0 20px !important;
}

.speak-icon {
  line-height: 50%;
  padding: 0;
  margin-left: 6px;
  border-radius: 14px;
  width: 46px;
  height: 46px;
}

.bounce {
  cursor: pointer;
  animation-name: bounce;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes bounce {
  0% { transform: translateY(15px); }
  100% { transform: translateY(0); }
}
</style>
