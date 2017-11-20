<template>
<div class="place">
  <div class="container">
    <h3 class="light text-center">
      การสัมภาษณ์จะจัดขึ้นในวันที่
      <datepicker
        language="th"
        :disabled="disabled"
        :value="new Date(2017, 10, 26)"
        wrapper-class="d-inline-block"
        format="dd MMMM yyyy"
        input-class="datepicker-input"
      ></datepicker>
      ณ <i>อาคาร ซี.พี.ทาวเวอร์ 1</i> (สีลม)
    </h3>
    <div style="margin-top: 60px">
      <h3 class="text-center">สิ่งที่ต้องเตรียมมาในวันสัมภาษณ์</h3>
      <ol style="font-size:1.2em;" class="medium">
        <li><u>บัตรประชาชน</u>สำหรับการแลกบัตรเข้าอาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) และ <u>บัตรนักศึกษา</u>สำหรับการลงทะเบียนสัมภาษณ์ กรุณาแต่งกายด้วยชุดนักศึกษา</li>
        <li><u>การบ้านและสิ่งที่กรรมการสาขากำหนดไว้</u> กรุณาอ่านรายละเอียดการบ้านและสิ่งที่กรรมการให้เตรียมมาให้ครบถ้วน หากสาขาใดต้องใช้โน้ตบุ๊ค ควรชาร์ตแบตเตอรี่และเตรียมอินเทอร์เน็ตส่วนตัวมาให้พร้อม เนื่องจากสถานที่ไม่มีบริการอินเทอร์เน็ตให้ใช้</li>
        <li><u>Portfolio</u> สามารถนำมาประกอบการสัมภาษณ์ได้ สำหรับน้อง ๆ สาขาดีไซน์จะต้องนำ Portfolio มาด้วยทุกคน</li>
      </ol>
    </div>
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
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: { Datepicker },
  data () {
    return {
      disabled: { days: [0, 1, 2, 3, 4, 5, 6] },
      center: { lat: 13.7275053, lng: 100.5326877 },
      markers: [{ position: { lat: 13.7275053, lng: 100.5326877 } }]
    }
  }
}
</script>

<style scoped>
.place {
  padding-top: 60px;
}

.gmap {
  width: 100%;
  height: 300px;
}

u {
  font-weight: bold;
}
</style>
