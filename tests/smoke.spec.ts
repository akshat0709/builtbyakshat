import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("?ref=orange-taxi redirects to /built/orange-taxi", async ({ page }) => {
    const response = await page.goto("/?ref=orange-taxi");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/built\/orange-taxi/);
    await expect(page.locator("h1")).toContainText("Orange Taxi");
  });

  test("malicious or unknown ref renders safely and does not inject script", async ({
    page,
  }) => {
    const malicious = '<script>alert("xss")</script>';
    const response = await page.goto(`/?ref=${encodeURIComponent(malicious)}`);
    expect(response?.status()).toBe(200);

    // Verify page content does not contain raw unescaped script tag
    const content = await page.content();
    expect(content).not.toContain('<script>alert("xss")</script>');
    await expect(page.locator("h1")).toContainText("Akshat Gupta");
  });

  test("/badge/orange-taxi returns image/svg+xml with product status chip", async ({
    request,
  }) => {
    const response = await request.get("/badge/orange-taxi");
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("image/svg+xml");

    const body = await response.text();
    expect(body).toContain("<svg");
    expect(body).toContain("Built by Akshat Gupta");
    expect(body).toContain("PRE-LAUNCH");
  });

  test("/badge/unknown-slug returns valid generic SVG badge", async ({ request }) => {
    const response = await request.get("/badge/some-unknown-slug");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg+xml");
    const body = await response.text();
    expect(body).toContain("Built by Akshat Gupta");
  });

  test("/security and /.well-known/security.txt load successfully", async ({
    page,
    request,
  }) => {
    // Check HTML page
    const pageRes = await page.goto("/security");
    expect(pageRes?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText("Security Policy");
    await expect(page.getByText("akshat070906@gmail.com")).toBeVisible();

    // Check RFC 9116 text file
    const txtRes = await request.get("/.well-known/security.txt");
    expect(txtRes.status()).toBe(200);
    const txtContent = await txtRes.text();
    expect(txtContent).toContain("Contact: mailto:akshat070906@gmail.com");
    expect(txtContent).toContain("Expires:");
  });

  test("every internal link in the nav resolves with HTTP 200", async ({ page }) => {
    const navLinks = [
      "/",
      "/experience",
      "/built",
      "/toolbox",
      "/lab",
      "/now",
      "/contact",
    ];

    for (const path of navLinks) {
      const response = await page.goto(path);
      expect(response?.status(), `Expected ${path} to return 200`).toBe(200);
      await expect(page.locator("nav[aria-label='Main navigation']")).toBeVisible();
    }
  });

  test("/contact.vcf returns valid vCard file", async ({ request }) => {
    const response = await request.get("/contact.vcf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/vcard");
    const body = await response.text();
    expect(body).toContain("BEGIN:VCARD");
    expect(body).toContain("FN:Akshat Gupta");
    expect(body).toContain("EMAIL;TYPE=INTERNET,HOME:akshat070906@gmail.com");
    expect(body).toContain("END:VCARD");
  });
});
