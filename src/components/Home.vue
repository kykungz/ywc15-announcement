<template>
<div class="home">
  <div class="full-height">
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
  <div id="first" ref="first" style="padding-top: 60px" class="container">
    <h3 class="light text-center">การสัมภาษณ์จะจัดขึ้นในวันที่
      <datepicker
        language="th"
        :disabled="disabled"
        :value="new Date(2017, 10, 26)"
        wrapper-class="d-inline-block"
        format="dd MMMM yyyy"
        input-class="datepicker-input"
      ></datepicker>
      ณ <i>อาคาร ซี.พี.ทาวเวอร์ 1</i> (สีลม)</h3>
    <div style="margin-top: 60px" class="row align-items-center">
      <div class="col-lg-7">
        <h3 class="text-center">การเดินทางมาสัมภาษณ์</h3>
        <ol style="font-size:1.2em;" class="medium">
          <li>ด้วยรถไฟฟ้า BTS สามารถลงสถานีศาลาแดง ณ ทางออกที่ 2</li>
          <li>ด้วยรถไฟฟ้า MRT สามารถลงสถานีสีลม ณ ทางออกที่ 2 โดยเดินเรียบทางเท้าไปตามถนนสีลม</li>
          <li>ด้วยรถประจำทาง สามารถขึ้นใช้บริการสาย 15, 77, 155, 504, 177, 76</li>
        </ol>
      </div>
      <div class="col-lg-5">
        <gmap-map
          :center="center"
          :zoom="17"
          class="gmap"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
        <div class="text-center">
          <i><small class="light">อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม)</small></i>
        </div>
      </div>
    </div>
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
import Datepicker from 'vuejs-datepicker'
import { API_URL } from '@/libraries/constants'
import List from '@/components/List'

export default {
  name: 'Home',
  components: { List, Datepicker },
  data () {
    return {
      loading: true,
      disabled: { days: [0, 1, 2, 3, 4, 5, 6] },
      result: [],
      search: this.$route.query.id || '',
      exclude: this.decode(this.$route.query.result) || '',
      center: { lat: 13.7275053, lng: 100.5326877 },
      markers: [{ position: { lat: 13.7275053, lng: 100.5326877 } }]
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
    jumpDown () {
      this.$SmoothScroll(this.$refs.first, 500)
    },
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
.full-height {
  min-height: 100vh;
  background: url("../../static/images/bg-front.png") repeat, url("../../static/images/bg.png") repeat;
  background-size: contain;
  color: white;
}

.gmap {
  width: 100%;
  height: 300px;
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

.bounce {
  cursor: pointer;
  animation-name: bounce;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.bounce:hover {
  transform: scale(1.1);
}
@keyframes bounce {
  0% { transform: translateY(15px); }
  100% { transform: translateY(0); }
}
</style>
