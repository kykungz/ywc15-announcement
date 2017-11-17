<template>
<div class="home container">
  <div class="input-group position-relative">
    <span class="input-group-addon rounded">
      <icon name="search"></icon>
    </span>
    <input v-model="search" type="text" class="form-control rounded" placeholder="Search name" aria-label="Search name">
    <span @click="reset()" class="remove-search">
      <icon v-show="search" name="times-circle" scale="1.1"></icon>
    </span>
  </div>
  <p>
    {{ candidates }}
    {{ candidates }}
    {{ candidates }}
    {{ candidates }}
    {{ candidates }}
    {{ candidates }}
    {{ candidates }}

  </p>
</div>
</template>

<script>
// import axios from 'axios'
import result from '@/libraries/candidates'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      candidates: []
    }
  },
  async mounted () {
    // const result = await axios.get('https://ywc15.ywc.in.th/static/announcement.json')
    // console.log(result)
    this.candidates = result
  },
  methods: {
    reset () {
      console.log('hi')
      this.search = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.remove-search {
  position: absolute;
  color: darkgray;
  cursor: pointer;
  top: 10px;
  right: 20px;
  z-index: 3;
  transition: color 200ms;
}

.remove-search:hover {
  color: gray;
}

.form-control.rounded {
  border-radius: 0 20px 20px 0 !important;
  padding-right: 46px !important;
}

.input-group-addon.rounded {
  border-radius: 20px 0 0 20px !important;
  padding-left: 16px !important;
}

.form-control.rounded::after {
  content: 'hi';
}
</style>
