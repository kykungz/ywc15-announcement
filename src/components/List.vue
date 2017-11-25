<template>
<div class="list">
  <b-modal ref="shareModel" hide-footer title="แชร์หน้าเว็บนี้">
      <div class="d-block text-center">
        <h3>ลิงก์พร้อมแล้ว​ แชร์เลย!</h3>
        <div class="input-group">
          <input ref="shareURL" onclick="this.select()" class="form-control" type="text" :value="shareURL">
          <span class="input-group-btn">
            <b-btn @click="copy" v-b-tooltip.hover title="Copy to clipboard">
              <icon name="clipboard"></icon>
            </b-btn>
          </span>
        </div>
      </div>
  </b-modal>

  <div class="major">
    <b-container>
      <h2>
        <img v-if="img" :src="img" class="img-fluid rounded-circle" width="60px" alt="">
        {{ major }}
      </h2>
      <hr>
    </b-container>
  </div>

  <pulse-loader class="text-center" :loading="loading" color="#212730"></pulse-loader>

  <h3 v-show="list.length <= 0 && !loading" style="margin-top: 40px" class="text-center text-muted">
    ขออภัย ไม่พบข้อมูลผู้สมัคร พบกันใหม่ปีหน้านะครับ !
  </h3>
  <b-container v-show="list.length > 0" class="mytable">
    <table class="table table-sm">
      <thead class="sticky">
        <tr>
          <td scope="col">รหัส</td>
          <td scope="col">ชื่อจริง</td>
          <td scope="col">นามสกุล</td>
          <td scope="col">สาขา</td>
          <td scope="col">เวลา</td>
          <td scope="col">แชร์</td>
        </tr>
      </thead>
      <tbody :class="{ cheer: isFound }">
        <tr :tabindex="isFound ? null : 0" onclick="this.focus()"
          class="tr-content" v-for="candidate in list"
        >
          <td>{{ candidate.interviewRef }}</td>
          <td>{{ candidate.firstName }}</td>
          <td>{{ candidate.lastName }}</td>
          <td>
            {{ candidate.major.substr(0, 1).toUpperCase() + candidate.major.substr(1) }}
          </td>
          <td>{{ candidate.time }}</td>
          <td style="padding-top: 6px">
            <social-sharing inline-template
              :url="`https://kykungz.github.io/ywc15-announcement/#/?id=${candidate.interviewRef}`"
              hashtags="ywc15,YoungWebmasterCamp15"
              class="d-inline"
            >
              <div class="social-icon">
                <network network="facebook">
                  <icon style="cursor: pointer" name="facebook-official"></icon>
                </network>
                <network network="twitter">
                  <icon style="cursor: pointer" name="twitter"></icon>
                </network>
              </div>
            </social-sharing>
            <span @click="share(candidate.interviewRef)" class="d-inline share">
              <icon style="cursor: pointer" name="share-alt"></icon>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BASE_URL } from '@/libraries/constants'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'List',
  props: ['major', 'list', 'img'],
  components: { PulseLoader },
  data () {
    return {
      shareURL: ''
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    isFound () {
      return this.list.length === 1
    }
  },
  methods: {
    share (id) {
      this.shareURL = BASE_URL + `?id=${id}`
      this.$refs.shareModel.show()
    },
    copy () {
      this.$refs.shareURL.select()
      document.execCommand('Copy')
    }
  },
  watch: {
    '$route.query' (query) {
      this.$refs.shareModel.hide()
    }
  }
}
</script>

<style scoped>
.major {
  position: sticky;
  top: 80px;
  background: linear-gradient(to bottom, white, white, rgba(255, 255, 255, 0.9));
  word-wrap: break-word;
  padding-top: 10px;
  z-index: 2;
}

hr {
  margin-top: 0;
}

img {
  background: #212730;
}

th {
  border-top-color: white;
  border-bottom-color: red;
}

thead {
  background: #e2e2e2;
  font-size: 1.2em;
}

.tr-content {
  font-weight: lighter;
  transition: all 200ms;
}

.tr-content:hover {
  background: #f2f2f2;
  transform: scale(1.1);
}

.tr-content:focus {
  background: orange;
  transform: scale(1.1);
  outline: none;
}

.tr-content:focus .social-icon, .tr-content:focus .share{
  color: #333333;
}

.tr-content:hover .social-icon, .tr-content:hover .share{
  color: #333333;
}

.social-icon, .share {
  color: #9d9d9d;
  transition: color 400ms;
}

.cheer {
  background: orange;
  font-size: 2em;
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.cheer:hover {
  animation: none;
}

.cheer .tr-content:hover {
  background: rgb(255, 122, 37);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@media (max-width: 1024px) {
  .cheer {
    animation: none;
    font-size: 1em;
  }
}

@media (max-width: 400px) {
  .mytable {
    overflow-x: scroll;
  }
}

</style>
