import { test, expect, type BrowserContext, type Page } from '@playwright/test';

// Driver: เตรียมสถานะ Login ด้วย Cookie แล้วเปิด Inventory โดยตรง ไม่ผ่าน Login Form
async function driverOpenInventory(context: BrowserContext): Promise<Page> {
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/inventory.html');
  return page;
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {

  annotation: {

    type: 'description',

    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'

  }

}, async ({ browser }) => {

  const context = await browser.newContext();
  let page!: Page;

  try {

    await test.step('สร้าง Driver และเปิด Inventory', async () => {

      // สร้าง BrowserContext และใช้ driverOpenInventory() ตั้งค่า Cookie
      page = await driverOpenInventory(context);
      await expect(page).toHaveURL(/inventory\.html/);

    });

    await test.step('ตรวจสอบ Inventory จริง', async () => {

      // ตรวจสอบสินค้า 6 รายการ
      await expect(page.locator('[data-test="title"]')).toHaveText('Products');
      await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

    });

    await test.step('เพิ่มสินค้า 2 รายการ', async () => {

      // เพิ่ม Backpack และ Bike Light แล้วตรวจสอบ Cart Badge = 2
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    });

    await test.step('ตรวจสอบสินค้าใน Cart', async () => {

      // เปิด Cart และตรวจสอบชื่อสินค้าทั้งสองรายการ
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);

      const cartItems = page.locator('[data-test="inventory-item-name"]');
      await expect(cartItems).toHaveCount(2);
      await expect(cartItems).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);

    });

  } finally {

    // ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
    await context.close();

  }

});
