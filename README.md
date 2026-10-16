# Final Exam: Software Testing ด้วย Playwright

**รหัสนักศึกษา:** รหัสนักศึกษา  
**ชื่อ-นามสกุล:** ชื่อ นามสกุล  
**ระบบที่ทดสอบ:** [https://www.saucedemo.com/](https://www.saucedemo.com/)

---

## IT-01: Top-Down Integration Testing ด้วย Stub

**ไฟล์:** `tests/integration/IT-01.spec.ts`  
**Test:** `IT-01: top-down REAL Login -> browser-level Inventory STUB`

### ส่วนที่เป็น Real

- หน้า Login ของ SauceDemo (`https://www.saucedemo.com/`)
- การกรอก Username `standard_user` และ Password `secret_sauce` แล้วกดปุ่ม Login
- การยืนยันตัวตนและการพาเข้าสู่ `inventory.html` ของระบบจริง ซึ่ง Test ตรวจสอบ URL ก่อนสร้าง Stub

### ส่วนที่เป็น Stub

- หน้า Inventory ที่สร้างด้วย `page.setContent()` หลังจาก Login จริงสำเร็จ
- ข้อความ `Mock Inventory Ready`
- สินค้าจำลอง 2 รายการ คือ `Mock Backpack` และ `Mock Bike Light`

Login เป็นโมดูลชั้นบนที่ทดสอบกับระบบจริง ส่วน Inventory เป็นโมดูลชั้นล่างที่ใช้ Stub แทน ตามแนวทาง Top-Down Integration Testing

> Stub นี้จำลอง DOM ในระดับ Browser หลัง Login จริง ไม่ได้แทน Internal Module ของ SauceDemo โดยตรง

---

## IT-02: Bottom-Up Integration Testing ด้วย Driver

**ไฟล์:** `tests/integration/IT-02.spec.ts`  
**Test:** `IT-02: DRIVER login state -> REAL Inventory and Cart`

### บทบาทของ Driver

ฟังก์ชัน `driverOpenInventory()` ทำหน้าที่เป็น Driver แทนขั้นตอน Login

1. ใช้ `BrowserContext.addCookies()` กำหนด Cookie `session-username` เป็น `standard_user` บนโดเมน `www.saucedemo.com`
2. เปิด `https://www.saucedemo.com/inventory.html` โดยตรง ไม่ผ่าน Login Form
3. ส่ง `Page` กลับให้ Test ใช้ทดสอบโมดูลชั้นล่างต่อ

เมื่อสิ้นสุดการทดสอบ จะปิด `BrowserContext` ที่สร้างเองด้วย `context.close()`

### ส่วนที่เป็น Real

- หน้า Inventory ของ SauceDemo ที่แสดงสินค้า 6 รายการ
- ปุ่ม Add to cart ของ Sauce Labs Backpack และ Sauce Labs Bike Light
- Cart Badge ที่แสดง `2`
- หน้า Shopping Cart (`cart.html`) ที่แสดงสินค้าทั้งสองรายการ

Driver ทำหน้าที่แทนโมดูลชั้นบน (Login Form) เพื่อเรียกใช้โมดูลชั้นล่าง (Inventory และ Cart) ที่เป็นระบบจริง ตามแนวทาง Bottom-Up Integration Testing
