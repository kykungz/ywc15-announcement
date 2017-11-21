# การบ้านสาขาโปรแกรมมิ่ง Young Webmaster Camp 15th
> ให้เขียน เว็บไซต์ประกาศผลผู้ผ่านเข้ารอบสัมภาษณ์ของ YWC#15 โดยใช้ข้อมูลจาก API โดยมี Feature ดังนี้
> * ดึงข้อมูลจาก API โดยตรง
> * ให้แสดงผลแยกแต่ละสาขา
> * มีระบบค้นหาชื่อผ่านกล่อง Search
> * ความสามารถหรือ Feature พิเศษอื่น ๆ ที่มีความแตกต่าง และแสดงความสามารถของน้องออกมาให้ได้มากที่สุด
>
> เมื่อทำเสร็จแล้วให้ Push Source Code ขึ้น GitHub ก่อนเวลาสัมภาษณ์

### PG39	กองภณ	จรัญวัฒนากิจ	Programming
## Feature
- คลิกที่วันที่เพื่อเปิด Calendar
- Google Map
- คลิกที่สาขาเพื่อ Scroll
- CSS บน Table
- Search โดย รหัส ชื่อจริง นามสกุล และ สาขา
- ข้อความเมื่อ Search ไม่พบ
- Loading screen ขณะเชื่อมต่อ API
- Animation เมื่อ Search พบผลลัพธ์คนเดียว
- Speech-to-text เพื่อค้นหาผู้ผ่านเข้ารอบ
- ปุ่ม Back to top
- Share ไปที่ Facebook และ Twitter
- Share หน้าเว็บที่แสดงชื่อคนที่ต้องการ
- Feature ซ่อนชื่อเพื่อนจากหน้าเว็บและการค้นหา (prank)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
