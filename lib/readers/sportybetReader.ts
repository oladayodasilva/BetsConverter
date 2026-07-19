import { chromium } from "playwright";
import path from "path";
import { mkdir } from "fs/promises";
import { parseSportyBetRawText } from "./parseSportybetText";

export async function readSportyBetCode(code: string) {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const screenshotDirectory = path.join(
    process.cwd(),
    "tmp",
    "sportybet-reader"
  );

  try {
    await mkdir(screenshotDirectory, {
      recursive: true,
    });

    await page.goto(
      "https://www.sportybet.com/ng/m/load_code?source=home",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      }
    );

    await page.waitForTimeout(3000);

    await page.screenshot({
      path: path.join(
        screenshotDirectory,
        `page-loaded-${Date.now()}.png`
      ),
      fullPage: true,
    });

    const input = page.locator("input").first();

    if ((await input.count()) === 0) {
      throw new Error(
        "No booking-code input field found on the SportyBet page."
      );
    }

    if (!(await input.isVisible())) {
      throw new Error(
        "The SportyBet booking-code input field was found but is not visible."
      );
    }

    await input.fill(code);

    await page.screenshot({
      path: path.join(
        screenshotDirectory,
        `code-filled-${Date.now()}.png`
      ),
      fullPage: true,
    });

    const button = page.locator("button").first();

    if ((await button.count()) === 0) {
      throw new Error(
        "No submit button found on the SportyBet page."
      );
    }

    if (!(await button.isVisible())) {
      throw new Error(
        "The SportyBet submit button was found but is not visible."
      );
    }

    await button.click();

    await page.waitForTimeout(6000);

    await page.screenshot({
      path: path.join(
        screenshotDirectory,
        `after-submit-${Date.now()}.png`
      ),
      fullPage: true,
    });

    const rawText = await page.locator("body").innerText();

    if (!rawText.trim()) {
      throw new Error(
        "SportyBet returned an empty page after submitting the booking code."
      );
    }

    const parsed = parseSportyBetRawText(rawText);

    return {
      success: true,
      sourceBookmaker: "sportybet",
      sourceCode: code,
      rawText,
      parsed,
    };
  } catch (error: unknown) {
    try {
      await page.screenshot({
        path: path.join(
          screenshotDirectory,
          `error-${Date.now()}.png`
        ),
        fullPage: true,
      });
    } catch (screenshotError) {
      console.error(
        "Could not capture SportyBet error screenshot:",
        screenshotError
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Could not read SportyBet code.";

    console.error("SportyBet reader failed:", {
      sourceCode: code,
      message,
      currentUrl: page.url(),
    });

    return {
      success: false,
      sourceBookmaker: "sportybet",
      sourceCode: code,
      message,
    };
  } finally {
    await browser.close();
  }
}