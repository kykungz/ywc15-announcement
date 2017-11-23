# การบ้านสาขาโปรแกรมมิ่ง Young Webmaster Camp 15th
> Reference: https://ywc15.ywc.in.th/
>
> ให้เขียน เว็บไซต์ประกาศผลผู้ผ่านเข้ารอบสัมภาษณ์ของ YWC#15 โดยใช้ข้อมูลจาก API โดยมี Feature ดังนี้
> * ดึงข้อมูลจาก API โดยตรง
> * ให้แสดงผลแยกแต่ละสาขา
> * มีระบบค้นหาชื่อผ่านกล่อง Search
> * ความสามารถหรือ Feature พิเศษอื่น ๆ ที่มีความแตกต่าง และแสดงความสามารถของน้องออกมาให้ได้มากที่สุด
>
> เมื่อทำเสร็จแล้วให้ Push Source Code ขึ้น GitHub ก่อนเวลาสัมภาษณ์

### PG39	กองภณ	จรัญวัฒนากิจ	Programming
Link: https://kykungz.github.io/ywc15-announcement

## Feature
- [x] คลิกที่วันที่เพื่อเปิด Calendar
- [x] Google Map
- [x] คลิกที่สาขาเพื่อ Scroll
- [x] CSS บน Table
- [x] Search โดย รหัส ชื่อจริง นามสกุล และ สาขา
- [x] ข้อความเมื่อ Search ไม่พบ
- [x] Loading screen ขณะเชื่อมต่อ API
- [x] Animation เมื่อ Search พบผลลัพธ์คนเดียว
- [x] Speech-to-text เพื่อค้นหาผู้ผ่านเข้ารอบ (Speech Recognition API)
- [x] ปุ่ม Back to top
- [x] Share ไปที่ Facebook และ Twitter
- [x] Share หน้าเว็บที่แสดงชื่อคนที่ต้องการ
- [x] Feature ซ่อนชื่อเพื่อนจากหน้าเว็บและการค้นหา (Prank)
- [x] Offline mode (Service Worker Cache + Local Storage)
- [x] Lazy loading image
- [ ] แจ้งเตือน (Push Notification API)

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
