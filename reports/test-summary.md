# สรุปผลการทดสอบ Playwright

ข้อมูลทั้งหมดในไฟล์นี้คัดลอกจาก `reports/results.json` และ `playwright-report/index.html` ที่ Playwright สร้างจากการรัน `npx playwright test` ครั้งล่าสุด โดยไม่ได้แก้ไขไฟล์รายงานด้วยตนเอง

## ข้อมูลการรัน

| รายการ | ค่า |
| :---- | :---- |
| วันเวลาที่รัน | 2026-10-16 13:54:36 (UTC+7) |
| คำสั่ง | `npx playwright test` |
| Playwright | 1.64.1 |
| Browser (Project) | chromium |
| Workers / Retries | 1 / 0 |
| ระบบที่ทดสอบ | https://www.saucedemo.com |
| เวลารวม | 5.95 วินาที |

## สรุปผลรวม

| สถานะ | จำนวน |
| :---- | ----: |
| Passed | 8 |
| Failed | 0 |
| Flaky | 0 |
| Skipped | 0 |
| **รวม** | **8** |

## ผลแยกตาม Test Case

| บท | ไฟล์ | ชื่อ Test | ผล | เวลา |
| :---- | :---- | :---- | :---- | ----: |
| 1 | `tests/unit/UT-01.spec.ts` | UT-01.1: empty username and password | ✅ Passed | 487 ms |
| 1 | `tests/unit/UT-01.spec.ts` | UT-01.2: missing password | ✅ Passed | 478 ms |
| 1 | `tests/unit/UT-01.spec.ts` | UT-01.3: invalid login details | ✅ Passed | 464 ms |
| 1 | `tests/unit/UT-02.spec.ts` | UT-02: product button state Add to cart -> Remove -> Add to cart | ✅ Passed | 688 ms |
| 2 | `tests/integration/IT-01.spec.ts` | IT-01: top-down REAL Login -> browser-level Inventory STUB | ✅ Passed | 796 ms |
| 2 | `tests/integration/IT-02.spec.ts` | IT-02: DRIVER login state -> REAL Inventory and Cart | ✅ Passed | 634 ms |
| 3 | `tests/system/ST-01.spec.ts` | ST-01: complete purchase of two products | ✅ Passed | 897 ms |
| 3 | `tests/system/ST-02.spec.ts` | ST-02: checkout validation and recovery | ✅ Passed | 905 ms |

## ผลแยกตาม Test Step

ทุก Step ในรายงานไม่มี Error

| Test | Steps (ผ่านทั้งหมด) |
| :---- | :---- |
| UT-01.1 | เปิดหน้า Login → ส่งฟอร์มโดยไม่กรอกข้อมูล → ตรวจสอบ Error และ URL |
| UT-01.2 | เปิดหน้า Login และกรอก Username → กด Login โดยไม่กรอก Password → ตรวจสอบ Error และ URL |
| UT-01.3 | เปิดหน้า Login และกรอกข้อมูลผิด → กด Login → ตรวจสอบ Error และ URL |
| UT-02 | Login เข้าสู่ระบบ → ตรวจสอบปุ่มก่อนเพิ่มสินค้า → เพิ่มสินค้าเข้า Cart → ลบสินค้าออกจาก Cart |
| IT-01 | Login ผ่านหน้าเว็บไซต์จริง → สร้าง Inventory Stub → ตรวจสอบผลจาก Stub |
| IT-02 | สร้าง Driver และเปิด Inventory → ตรวจสอบ Inventory จริง → เพิ่มสินค้า 2 รายการ → ตรวจสอบสินค้าใน Cart |
| ST-01 | Login และตรวจสอบ Inventory → เพิ่มสินค้าสองรายการ → ตรวจสอบ Cart → กรอก Checkout Information → ตรวจสอบ Overview และสั่งซื้อ → ตรวจสอบ Order Complete |
| ST-02 | Login เพิ่มสินค้า และเปิด Checkout → ตรวจสอบ First Name is required → ตรวจสอบ Last Name is required → ตรวจสอบ Postal Code is required → แก้ไขข้อมูลและสั่งซื้อสำเร็จ |

## ข้อผิดพลาดที่พบ

ไม่พบข้อผิดพลาดในการรันครั้งนี้ ไม่มี Test Case ใด Failed และไม่มี Error ระดับ Global (`errors: []` ใน `results.json`)

เนื่องจากทุก Test ผ่าน `playwright-report/` จึงมีเพียง `index.html` ไม่มีโฟลเดอร์ `data/` ที่เก็บ Screenshot, Video หรือ Trace ซึ่งระบบจะบันทึกเฉพาะเมื่อ Test ล้มเหลว (`only-on-failure` / `retain-on-failure`)

## วิธีดูรายงาน

```bash
npx playwright show-report
```
