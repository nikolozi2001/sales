import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = 3000;

async function scrapeProducts() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    "https://www.2nabiji.ge/ge/search?searchId=64c19575b3118b3676d26898",
    { waitUntil: "networkidle2" }
  );

  // დაელოდე პროდუქტის ბლოკებს
  await page.waitForSelector(".ProductCard_container__7IE0M");

  const products = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll(".ProductCard_container__7IE0M").forEach((el) => {
      const title = el.querySelector(".ProductCard_title__Rpp75 span")?.getAttribute("title")?.trim();
      const image = el.querySelector("img")?.getAttribute("src");
      const price = el.querySelector(".ProductCard_productInfo__price__NyCJR span")?.innerText.trim();
      const oldPrice = el.querySelector(".ProductCard_productInfo__price_discount__CXdp2 span")?.innerText.trim();
      const discount = el.querySelector(".Label_label__EnQXP")?.innerText.trim();

      items.push({ title, image, price, oldPrice, discount });
    });
    return items;
  });

  await browser.close();
  return products;
}

// API route
app.get("/products", async (req, res) => {
  try {
    const products = await scrapeProducts();
    res.json(products);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "ფასების წამოღება ვერ მოხერხდა" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});