import { test, expect } from "@playwright/test";

test(
  "IT-01: top-down REAL Login -> browser-level Inventory STUB",
  {
    annotation: {
      type: "description",

      description:
        "ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()",
    },
  },
  async ({ page }) => {
    await test.step("Login ผ่านหน้าเว็บไซต์จริง", async () => {
      // Login และตรวจสอบ URL inventory.html
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    });

    await test.step("สร้าง Inventory Stub", async () => {
      // ใช้ page.setContent() แสดง Mock Inventory Ready และสินค้าจำลอง 2 รายการ
      await page.setContent(`
        <main data-test="stub-inventory">
          <h1 data-test="stub-status">Mock Inventory Ready</h1>
          <ul data-test="stub-inventory-list">
            <li data-test="stub-item-name">Mock Backpack</li>
            <li data-test="stub-item-name">Mock Bike Light</li>
          </ul>
        </main>
      `);
      await expect(page.locator('[data-test="stub-inventory"]')).toBeVisible();
    });

    await test.step("ตรวจสอบผลจาก Stub", async () => {
      // ตรวจสอบข้อความ จำนวน และชื่อสินค้าจำลอง
      const items = page.locator('[data-test="stub-item-name"]');
      await expect(page.locator('[data-test="stub-status"]')).toHaveText(
        "Mock Inventory Ready",
      );
      await expect(items).toHaveCount(2);
      await expect(items).toHaveText(["Mock Backpack", "Mock Bike Light"]);
    });
  },
);
