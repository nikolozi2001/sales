import express from "express";
import puppeteer from "puppeteer";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";

const app = express();
app.use(cors());
const PORT = 3000;

// Cache setup (5 minutes TTL)
const cache = new NodeCache({ stdTTL: 300 });

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});

// Apply rate limiting to API routes
app.use("/products", limiter);
app.use("/nikora", limiter);
app.use("/libre", limiter);

const BASE_URL = "https://nikorasupermarket.ge";
const LIBRE_URL = "https://libre.ge/productebi/boom-price";
const LIBRE_URL_PRODUCTS = "https://libre.ge/productebi/";

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

async function scrapeNikora() {
  try {
    let page = 1;
    let allProducts = [];

    while (true) {
      const url = `${BASE_URL}/ge/%E1%83%9B%E1%83%98%E1%83%9B%E1%83%93%E1%83%98%E1%83%9C%E1%83%90%E1%83%A0%E1%83%94-%E1%83%90%E1%83%A5%E1%83%AA%E1%83%98%E1%83%94%E1%83%91%E1%83%98/2-%E1%83%99%E1%83%95%E1%83%98%E1%83%A0%E1%83%98%E1%83%90%E1%83%9C%E1%83%98?page=${page}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const products = [];

      $(".lg_4.lp_6.md_6.sm_6.xs_12").each((_, el) => {
        const name = $(el).find("h4").text().trim();
        const img = BASE_URL + $(el).find("img").attr("src");
        const link = BASE_URL + $(el).find("a").attr("href");

        // ახალი ფასი
        const newLari = $(el).find(".new .cp103.cp104").text().trim();
        const newTetri = $(el).find(".new sup small").text().trim();
        const newPrice = `${newLari}.${newTetri} ₾`;

        // ძველი ფასი
        const oldLari = $(el).find(".old .cp103.cp105").text().trim();
        const oldTetri = $(el).find(".old sup small").text().trim();
        const oldPrice = `${oldLari}.${oldTetri} ₾`;

        // დარჩენილი დღეები
        const days = $(el).find(".cp_date").text().trim();

        products.push({ name, img, link, newPrice, oldPrice, days });
      });

      if (products.length === 0) {
        break; // მეტი გვერდი აღარ არის
      }

      allProducts = allProducts.concat(products);
      page++;
    }

    return allProducts;
  } catch (err) {
    console.error("Scraping error:", err.message);
    return [];
  }
}

async function scrapeLibre() {
  try {
    const { data } = await axios.get(LIBRE_URL);
    const $ = cheerio.load(data);

    const products = [];

    $(".home__promotions_products").each((_, el) => {
      const link = "https://libre.ge" + $(el).find("a.link-secondary").attr("href");
      const img = $(el).find("img.products__image").attr("src");
      const name = $(el).find(".product_card__title .line_2").text().trim();

      const lari = $(el).find(".product_card__new_price_lari").text().trim();
      const tetri = $(el).find(".product_card__new_price_tetri").text().trim();
      const newPrice = `${lari}.${tetri} ₾`;

      const oldPrice = $(el).find(".product_card__old_price").text().trim() + " ₾";

      products.push({ name, link, img, newPrice, oldPrice });
    });

    return products;
  } catch (err) {
    console.error("Libre scraping error:", err.message);
    return [];
  }
}

async function scrapeLibreProducts() {
  try {
    const { data } = await axios.get(LIBRE_URL_PRODUCTS);
    const $ = cheerio.load(data);

    const products = [];

    $(".home__promotions_products").each((_, el) => {
      const link = "https://libre.ge" + $(el).find("a.link-secondary").attr("href");
      const img = $(el).find("img.products__image").attr("src");
      const name = $(el).find(".product_card__title .line_2").text().trim();

      const lari = $(el).find(".product_card__new_price_lari").text().trim();
      const tetri = $(el).find(".product_card__new_price_tetri").text().trim();
      const newPrice = `${lari}.${tetri} ₾`;

      const oldPrice = $(el).find(".product_card__old_price").text().trim() + " ₾";

      products.push({ name, link, img, newPrice, oldPrice });
    });

    return products;
  } catch (err) {
    console.error("Libre scraping error:", err.message);
    return [];
  }
}

// API routes
app.get("/products", async (req, res) => {
  try {
    const cacheKey = "products";
    const cached = cache.get(cacheKey);

    if (cached) {
      console.log("📋 Returning cached products");
      return res.json(cached);
    }

    const products = await scrapeProducts();
    cache.set(cacheKey, products);
    res.json(products);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "ფასების წამოღება ვერ მოხერხდა" });
  }
});

app.get("/nikora", async (req, res) => {
  const cacheKey = "nikora";
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log("📋 Returning cached nikora products");
    return res.json(cached);
  }

  const products = await scrapeNikora();
  cache.set(cacheKey, products);
  res.json(products);
});

app.get("/libre", async (req, res) => {
  const cacheKey = "libre";
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log("📋 Returning cached libre products");
    return res.json(cached);
  }

  const products = await scrapeLibre();
  cache.set(cacheKey, products);
  res.json(products);
});

app.get("/libre-products", async (req, res) => {
  const cacheKey = "libre_products";
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log("📋 Returning cached libre products");
    return res.json(cached);
  }

  const products = await scrapeLibreProducts();
  cache.set(cacheKey, products);
  res.json(products);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    cache: {
      keys: cache.keys(),
      stats: cache.getStats()
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`🔒 Rate limiting: 100 requests per 15 minutes`);
  console.log(`💾 Caching: 5 minutes TTL`);
});