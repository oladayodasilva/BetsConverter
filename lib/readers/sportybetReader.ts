import { chromium } from "playwright";
import { parseSportyBetRawText } from "./parseSportybetText";

export async function readSportyBetCode(code: string) {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://www.sportybet.com/ng/m/load_code?source=home", {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    await page.waitForTimeout(3000);

    const inputs = await page.locator("input").count();

    if (inputs === 0) {
      throw new Error("No input field found on SportyBet load-code page.");
    }

    await page.locator("input").first().fill(code);

    const buttons = page.locator("button");
    const buttonCount = await buttons.count();

    if (buttonCount === 0) {
      throw new Error("No button found on SportyBet load-code page.");
    }

    await buttons.first().click();

    await page.waitForTimeout(5000);

    const rawText = await page.locator("body").innerText();
    const parsed = parseSportyBetRawText(rawText);
    
    await browser.close();

    return {
        success: true,
        sourceBookmaker: "sportybet",
        sourceCode: code,
        rawText,
        parsed,
      };

  } catch (error: any) {
    await browser.close();

    return {
      success: false,
      sourceBookmaker: "sportybet",
      sourceCode: code,
      message: error.message || "Could not read SportyBet code.",
    };

  }
}