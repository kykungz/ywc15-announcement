<template>
  <div class="list">
    <div class="major">
      <h2>
        {{ this.major }}
      </h2>
      <hr>
    </div>
    {{ this.list }}
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
