<template>
<div class="home">
  <div class="text-center container">
    <h1 class="display-4">ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์</h1>
    <h2>โครงการ Young Webmaster Camp 15<sup>th</sup></h2>
  </div>

  <div class="search-bar sticky-top">
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

  <list v-show="search" :loading="loading" :major='`ผลการค้นหา "${search}"`' :list="filtered"></list>
  <div v-show="!search">
    <list :loading="loading" major="Web Content" img="static/images/content.png" :list="candidates.content"></list>
    <list :loading="loading" major="Web Design" img="static/images/design.png" :list="candidates.design"></list>
    <list :loading="loading" major="Web Marketing" img="static/images/marketing.png" :list="candidates.marketing"></list>
    <list :loading="loading" major="Web Programming" img="static/images/programming.png" :list="candidates.programming"></list>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/libraries/constants'
import List from '@/components/List'

export default {
  name: 'Home',
  components: { List },
  data () {
    return {
      loading: true,
      result: [],
      search: this.$route.query.id || '',
      exclude: this.decode(this.$route.query.result) || ''
    }
  },
  async mounted () {
    this.result = (await axios.get(API_URL)).data
    this.loading = false
  },
  computed: {
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
    reset () {
      this.search = ''
    },
    filterMajor (major) {
      return this.result.filter(candidate =>
        candidate.major === major && candidate.interviewRef !== this.exclude
      ).sort((a, b) => a.interviewRef.localeCompare(b.interviewRef))
    },
    encode (id) {
      return id.split('').map(letter => letter.charCodeAt(0) - 20).join('')
    },
    decode (id) {
      return id
        ? id.match(/.{1,2}/g).map(letter => String.fromCharCode(parseInt(letter) + 20)).join('')
        : undefined
    }
  },
  watch: {
    '$route.query' (query) {
      this.search = query.id || ''
      this.exclude = this.decode(query.result) || ''
    }
  }
}
</script>

<style scoped>
.home {
  margin-top: 40px;
}

.dark-bg {
  background: rgb(57, 57, 57);
  border-radius: 8px;
}

.white {
  color: #eeeeee;
}

.search-bar {
  padding: 30px 0 10px 0;
  margin-bottom: 20px;
  background: white;
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
</style>
