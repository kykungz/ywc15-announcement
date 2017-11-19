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
      <div class="container">
        <h2>
          <img v-if="img" :src="img" class="img-fluid" width="100px" alt="">
          {{ major }}
        </h2>
        <hr>
      </div>
    </div>
    <h3 v-show="list.length <= 0" style="margin-top: 40px" class="text-center text-muted">
      ขออภัยไม่พบข้อมูลผู้สมัคร พบกันใหม่ปีหน้านะครับ !
    </h3>
    <div v-show="list.length > 0" class="container mytable">
      <table class="table table-sm">
        <thead class="sticky">
          <tr>
            <th scope="col">รหัส</th>
            <th scope="col">ชื่อจริง</th>
            <th scope="col">นามสกุล</th>
            <th scope="col">สาขา</th>
            <th scope="col">เวลา</th>
            <th scope="col">แชร์</th>
          </tr>
        </thead>
        <tbody>
          <tr tabindex="1"class="tr-content" v-for="candidate in list">
            <td>{{ candidate.interviewRef }}</td>
            <td>{{ candidate.firstName }}</td>
            <td>{{ candidate.lastName }}</td>
            <td>
              {{ candidate.major.substr(0, 1).toUpperCase() + candidate.major.substr(1) }}
            </td>
            <td>บ่าย</td>
            <td style="padding-top: 6px">
              <social-sharing inline-template
                :url="`https://kykungz.github.io/ywc15-announcement/#/?id=${candidate.interviewRef}`"
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
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/libraries/constants'
export default {
  name: 'List',
  props: ['major', 'list', 'img'],
  data () {
    return {
      shareURL: ''
    }
  },
  watch: {
    '$route.query' (query) {
      this.$refs.shareModel.hide()
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
  }
}
</script>

<style scoped>
.major {
  position: sticky;
  top: 80px;
  background: white;
  word-wrap: break-word;
  padding-top: 10px;
  z-index: 30;
}

hr {
    margin-top: 0;
}

img {
  margin-top: -10px;
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

.tr-content:hover .social-icon, .tr-content:hover .share{
  color: #333333;
}

.social-icon, .share {
  color: #9d9d9d;
  transition: color 400ms;
}

@media (max-width: 400px) {
  .mytable {
    overflow-x: scroll;
  }
}
</style>
