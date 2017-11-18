<template>
  <div class="list">
    <div class="major">
      <h2>
        {{ major }}
      </h2>
      <hr>
    </div>
    <h3 v-if="list.length <= 0" style="margin-top: 40px" class="text-center text-muted">
      ขออภัยไม่พบข้อมูลผู้สมัคร พบกันใหม่ปีหน้านะครับ !
    </h3>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">รหัส</th>
            <th scope="col">ชื่อจริง</th>
            <th scope="col">นามสกุล</th>
            <th scope="col">สาขา</th>
            <th scope="col">เวลา</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row" v-for="candidate in list">
            <td scope="row"><strong>{{ candidate.interviewRef }}</strong></td>
            <td>{{ candidate.firstName }}</td>
            <td>{{ candidate.lastName }}</td>
            <td>
              {{ candidate.major.substr(0, 1).toUpperCase() + candidate.major.substr(1) }}
            </td>
            <td>บ่าย</td>
          </tr>
        </tbody>
      </table>
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

th {
  border-top-color: white;
}

.table-row {
  transition: background 200ms;
}

.table-row:hover {
  background: #f2f2f2;
}

.table-row:focus {
  background: #c9c9c9;
}
</style>
