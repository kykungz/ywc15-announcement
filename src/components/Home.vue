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
  <div ref="info">
    <information></information>
  </div>

  <!-- Search Bar -->
  <div ref="searchBar" class="search-bar sticky-top">
    <div class="container input-group input-group-lg position-relative">
      <span class="input-group-addon rounded">
        <icon name="search"></icon>
      </span>
      <input v-model="search" type="text" class="form-control rounded"
        placeholder="ค้นหาด้วย ชื่อ, รหัส, สาขา" aria-label="ค้นหาด้วย ชื่อ, รหัส, สาขา"
      >
      <span @click="reset()" class="remove-search">
        <icon v-show="search" name="times-circle" scale="1.4"></icon>
      </span>
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

  <prank :found="filtered.length === 1 ? filtered[0] : null"></prank>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { decrypt } from '@/libraries/functions'
import List from '@/components/List'
import Information from '@/components/Information'
import Prank from '@/components/Prank'

export default {
  name: 'Home',
  components: { List, Information, Prank },
  data () {
    return {
      // Use inline-style object to avoid webpack resolve incorrect URL
      bg: {
        background: `url('static/images/bg-front.png') repeat, url('static/images/bg.png') repeat`,
        backgroundSize: 'contain'
      },
      search: this.$route.query.id || '',
      exclude: decrypt(this.$route.query.result) || ''
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
        return this.result
          .filter(candidate =>
            Object.keys(candidate).some(key => candidate[key]
                .toLowerCase()
                .includes(this.search.trim().toLowerCase())) &&
            candidate.interviewRef !== this.exclude
          )
      }
      return []
    }
  },
  methods: {
    jumpDown () {
      this.$SmoothScroll(this.$refs.info, 500)
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
  mounted () {
    this.$SmoothScroll(this.$refs.searchBar, 200)
  },
  watch: {
    '$route.query' (query) {
      this.search = query.id || ''
      this.exclude = decrypt(query.result) || ''
      this.$SmoothScroll(this.$refs.searchBar, 200)
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
  right: 30px;
  z-index: 3;
  transition: color 200ms;
}

.remove-search:hover {
  color: gray;
}

.form-control.rounded {
  border-radius: 0 20px 20px 0 !important;
  padding-right: 42px !important;
}

.input-group-addon.rounded {
  border-radius: 20px 0 0 20px !important;
  padding-left: 16px !important;
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
