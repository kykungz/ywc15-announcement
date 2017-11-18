<template>
  <div class="list">
    <div class="major">
      <h2>
        {{ this.major }}
      </h2>
      <hr>
    </div>
    <h3 v-if="this.list.length <= 0" style="margin-top: 40px" class="text-center text-muted">
      ขออภัยไม่พบข้อมูลผู้สมัคร พบกันใหม่ปีหน้านะครับ !
    </h3>
    <div v-else>
      {{ this.list }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['major', 'list']
}
</script>

<style scoped>
.major {
  position: sticky;
  top: 100px;
  background: white;
  word-wrap: break-word;
}
</style>
