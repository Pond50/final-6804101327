import { test, expect } from "@playwright/test";

test(
  "ST-02: checkout validation and recovery",
  {
    annotation: {
      type: "description",

      description:
        "ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ",
    },
  },
  async ({ page }) => {
    const firstName = page.locator('[data-test="firstName"]');
    const lastName = page.locator('[data-test="lastName"]');
    const postalCode = page.locator('[data-test="postalCode"]');
    const continueButton = page.locator('[data-test="continue"]');
    const error = page.locator('[data-test="error"]');

    await test.step("Login เพิ่มสินค้า และเปิด Checkout", async () => {
      // เตรียมขั้นตอน Checkout ด้วยระบบจริง
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL(/inventory\.html/);

      await page
        .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
        "1",
      );

      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);
      await page.locator('[data-test="checkout"]').click();
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    await test.step("ตรวจสอบ First Name is required", async () => {
      // ส่งฟอร์มว่างและตรวจสอบ Error
      await continueButton.click();
      await expect(error).toHaveText("Error: First Name is required");
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    await test.step("ตรวจสอบ Last Name is required", async () => {
      // กรอก First Name และตรวจสอบ Error
      await firstName.fill("John");
      await continueButton.click();
      await expect(error).toHaveText("Error: Last Name is required");
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    await test.step("ตรวจสอบ Postal Code is required", async () => {
      // กรอก Last Name และตรวจสอบ Error
      await lastName.fill("Doe");
      await continueButton.click();
      await expect(error).toHaveText("Error: Postal Code is required");
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    await test.step("แก้ไขข้อมูลและสั่งซื้อสำเร็จ", async () => {
      // กรอก Postal Code, ตรวจสอบ Overview, กด Finish และตรวจสอบข้อความสำเร็จ
      await postalCode.fill("50000");
      await continueButton.click();
      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(page.locator('[data-test="title"]')).toHaveText(
        "Checkout: Overview",
      );
      await expect(
        page.locator('[data-test="inventory-item-name"]'),
      ).toHaveText(["Sauce Labs Backpack"]);

      await page.locator('[data-test="finish"]').click();
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(page.locator('[data-test="complete-header"]')).toHaveText(
        "Thank you for your order!",
      );
    });
  },
);
