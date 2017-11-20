<template>
<div class="prank">
  <div class="container text-right">
    <b-btn @click="reset" class="my-btn" size="lg" variant="danger" v-b-modal.prankModal>แกล้งเพื่อน</b-btn>

    <b-modal class="text-center" ref="prankModal" id="prankModal"
      hide-footer title="แกล้งเพื่อน"
    >
      <h3>ซ่อนชื่อเพื่อนจากการค้นหา</h3>

      <b-form-input v-model="exclude" style="max-width: 8em" maxlength="4" class="mx-auto text-center"
        size="lg" type="text" placeholder="รหัส 4 หลัก"
      ></b-form-input>
      <small v-if="found.length === 1" class="text-success">{{ `${found[0].firstName} ${found[0].lastName}` }}</small>
      <small v-else class="text-danger">ไม่พบข้อมูล</small>
      <b-form-text>รหัสของคนที่ต้องการจะซ่อน เช่น: PG03, MK32</b-form-text>

      <b-input-group style="margin-top: 10px">
        <b-form-input ref="prankURL" onclick="this.select()" readonly
          class="form-control" type="text" :value="prankURL"
        ></b-form-input>
        <b-input-group-button slot="right">
          <b-btn @click="copy" v-b-tooltip.hover title="Copy to clipboard">
            <icon name="clipboard"></icon>
          </b-btn>
        </b-input-group-button>
      </b-input-group>
    </b-modal>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { encrypt } from '@/libraries/functions'
import { BASE_URL } from '@/libraries/constants'

export default {
  props: ['candidate'],
  data () {
    return {
      exclude: ''
    }
  },
  computed: {
    ...mapGetters([
      'result'
    ]),
    found () {
      return this.result.filter(candidate =>
        candidate.interviewRef.toUpperCase() === this.exclude.trim().toUpperCase()
      )
    },
    prankURL () {
      return this.found.length === 1
        ? BASE_URL + '?result=' + encrypt(this.exclude)
        : ''
    }
  },
  methods: {
    reset () {
      this.exclude = this.candidate ? this.candidate.interviewRef : ''
    },
    copy () {
      this.$refs.prankURL.$el.select()
      document.execCommand('Copy')
    }
  },
  watch: {
    '$route.query' (query) {
      this.$refs.prankModal.hide()
    }
  }
}
</script>

<style scoped>
</style>
