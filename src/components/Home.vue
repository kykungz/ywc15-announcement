<template>
<div class="home">
  <!-- Welcome -->
  <div
    :style="bg"
    class="full-height">
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
    <div class="container input-group input-group-lg position-relative">
      <span class="input-group-addon search-icon">
        <icon name="search"></icon>
      </span>
      <input v-model="search" type="text" class="form-control search-input"
        placeholder="ค้นหาด้วย ชื่อ, รหัส, สาขา" aria-label="ค้นหาด้วย ชื่อ, รหัส, สาขา"
      >
      <span @click="reset()" class="remove-search">
        <icon v-show="search" name="times-circle" scale="1.4"></icon>
      </span>
      <button ref="speakButton" @click="speechClicked" type="button" class="btn btn-primary speak-icon">
        <scale-loader v-if="listening" width="2px" height="16px" color="white"></scale-loader>
        <icon v-else name="microphone" scale="1.4"></icon>
      </button>
    </div>
  </div>

  <!-- Candidate List -->
  <list v-show="search" :loading="loading" :major='`ผลการค้นหา "${search}"`' :list="filtered"></list>

  <div v-show="!search">
    <div class="container major">
      <div class="row text-center">
        <div class="col-6 col-md-3" v-for="major in ['content', 'design', 'marketing', 'programming']">
          <img
            @click="scrollTo(`${major}Major`)"
            :src="`static/images/${major}.png`"
            width="160px"
            class="img-fluid rounded-circle dark-bg"
          >
          <br>
          <h4>{{ major.substr(0, 1).toUpperCase() + major.substr(1) }}</h4>
        </div>
      </div>
    </div>

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

      recognition.onend = (event) => {
        this.listening = false
      }

      recognition.onstart = (event) => {
        this.listening = true
      }

      this.recognition = recognition
    } catch (e) {
      console.log(e)
      this.$refs.speakButton.disabled = true
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
    speechClicked () {
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
      ).sort((a, b) => a.interviewRef.localeCompare(b.interviewRef))
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
  right: 84px;
  z-index: 3;
  transition: color 200ms;
}

.remove-search:hover {
  color: gray;
}

.search-input {
  border-radius: 0 20px 20px 0 !important;
  padding-right: 42px;
}

.search-icon {
  border-radius: 20px 0 0 20px;
}

.speak-icon {
  padding: 0;
  cursor: pointer;
  margin-left: 6px;
  text-align: center;
  line-height: 50%;
  border-radius: 14px;
  width: 46px;
  height: 46px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  transition: all 300ms;
}

.speak-icon:hover {
  transform: translateY(2px);
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
