<template>
<div class="d-inline-block prank">
  <b-btn class="my-btn" size="lg" variant="info"
    v-b-tooltip.hover.left="'แจ้งเตือนเมื่อถึงเวลา'" v-b-modal.reminderModal
  >
    แจ้งเตือน
    <icon name="bell"></icon>
  </b-btn>

  <b-modal class="text-center" ref="reminderModal" id="reminderModal" title="แกล้งเพื่อน"
    ok-title="ตกลง" cancel-title="ยกเลิก"
  >
    <h4>เปิดการแจ้งเตือนในวันที่ 26 พฤษจิกายน 2017</h4>
  </b-modal>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
