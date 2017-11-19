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

  <list v-show="search" :major='`ผลการค้นหา "${search}"`' :list="filtered"></list>
  <div v-show="!search">
    <list major="Web Content" img="static/images/content.png" :list="candidates.content"></list>
    <list major="Web Design" img="static/images/design.png" :list="candidates.design"></list>
    <list major="Web Marketing" img="static/images/marketing.png" :list="candidates.marketing"></list>
    <list major="Web Programming" img="static/images/programming.png" :list="candidates.programming"></list>
  </div>

</div>
</template>

<script>
// import axios from 'axios'
import result from '@/libraries/candidates'
import List from '@/components/List'
export default {
  name: 'Home',
  components: { List },
  data () {
    return {
      search: this.$route.query.id || '',
      candidates: {
        content: [],
        design: [],
        marketing: [],
        programming: []
      }
    }
  },
  async mounted () {
    // const result = await axios.get('https://ywc15.ywc.in.th/static/announcement.json')
    // console.log(result)
    const filterMajor = (major) => result.filter(candidate => candidate.major === major)
        .sort((a, b) => a.interviewRef.localeCompare(b.interviewRef))

    this.candidates = {
      content: filterMajor('content'),
      design: filterMajor('design'),
      marketing: filterMajor('marketing'),
      programming: filterMajor('programming')
    }
  },
  methods: {
    reset () {
      this.search = ''
    }
  },
  computed: {
    filtered () {
      if (this.search) {
        return result.filter(candidate =>
          Object.keys(candidate).some(key => candidate[key]
              .toLowerCase()
              .includes(this.search.toLowerCase()))
        )
      }
      return []
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
