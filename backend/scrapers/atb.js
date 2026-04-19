const { withBrowser, withRetry } = require("./base");

const ATB_BASE = "https://www.atbmarket.com";
const PROMO_URL = ATB_BASE + "/promo/all";

const DELAY_MS = 2000;

async function scrapePromoList(page) {
  await page.goto(PROMO_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForSelector(".actions-list__item", { timeout: 15000 });

  const promos = await page.$$eval(".actions-list__item", (items) => {
    return items.map((el) => {
      const linkEl = el.querySelector("a.actions-list__img");
      const titleEl = el.querySelector(".actions-list__title");
      return {
        title: titleEl ? titleEl.textContent.trim() : "Без назви",
        path: linkEl ? linkEl.getAttribute("href") : null,
      };
    });
  });

  return promos.filter((c) => c.path);
}

async function waitForCloudflare(page) {
  const title = await page.title();
  if (!title.includes("moment") && !title.includes("Cloudflare")) {
    return true;
  }

  console.warn("Cloudflare заблокував, чекаємо");

  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const newTitle = await page.title();
    if (!newTitle.includes("moment") && !newTitle.includes("Cloudflare")) {
      return true;
    }
  }

  return false;
}

async function scrapePromoProducts(page, promoPath, promoTitle) {
  const url = ATB_BASE + promoPath;

  await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

  const passed = await waitForCloudflare(page);
  if (!passed) {
    console.warn("Cloudflare не пустив: " + url);
    return [];
  }

  const hasProducts = await page
    .waitForSelector("article.catalog-item", { timeout: 10000 })
    .then(() => true)
    .catch(() => false);

  if (!hasProducts) {
    console.warn("Немає товарів в акції: " + promoTitle);
    return [];
  }

  const endDate = await page
    .$eval(".actionsTimer[data-time]", (el) => el.getAttribute("data-time"))
    .catch(() => null);

  const products = await page.$$eval("article.catalog-item", (items) => {
    return items.map((el) => {
      const titleEl = el.querySelector(".catalog-item__title a");
      const newPriceEl = el.querySelector(".product-price__top");
      const oldPriceEl = el.querySelector(".product-price__bottom");
      const imgEl = el.querySelector("img.catalog-item__img");

      return {
        name: titleEl ? titleEl.textContent.trim() : null,
        path: titleEl ? titleEl.getAttribute("href") : null,
        newPriceRaw: newPriceEl ? newPriceEl.getAttribute("value") : null,
        oldPriceRaw: oldPriceEl ? oldPriceEl.getAttribute("value") : null,
        imgSrc: imgEl ? imgEl.getAttribute("src") : null,
      };
    });
  });

  return products.map((p) => ({
    ...p,
    promoTitle,
    endDate,
  }));
}

async function scrape() {
  return withBrowser(async (page) => {
    console.log("Завантаження акцій з " + PROMO_URL);
    const promos = await withRetry(() => scrapePromoList(page));
    console.log("Знайдено " + promos.length + " акцій");

    let allProducts = [];

    for (const promo of promos) {
      console.log("Збираємо товари: " + promo.title);

      try {
        const products = await withRetry(
          () => scrapePromoProducts(page, promo.path, promo.title),
          2,
        );
        allProducts = allProducts.concat(products);
        console.log(products.length + " товарів");
      } catch (err) {
        console.warn("Помилка: " + err.message);
      }

      await new Promise((r) => setTimeout(r, DELAY_MS));
    }

    const valid = allProducts.filter((p) => p.name && p.newPriceRaw);

    const seen = new Map();
    for (const p of valid) {
      if (!seen.has(p.name)) {
        seen.set(p.name, p);
      }
    }
    const unique = Array.from(seen.values());

    console.log("Всього валідних: " + valid.length + ", унікальних: " + unique.length);

    return unique.map((p) => {
      const newPrice = parsePrice(p.newPriceRaw);
      const oldPrice = parsePrice(p.oldPriceRaw);
      const endsAt = parseEndDate(p.endDate);

      return {
        title: p.name,
        store: "ATB",
        new_price: newPrice,
        old_price: oldPrice,
        discount_percent: calcDiscount(oldPrice, newPrice),
        image_url: makeFullUrl(p.imgSrc),
        url: p.path ? ATB_BASE + p.path : null,
        category: p.promoTitle,
        starts_at: null,
        ends_at: endsAt,
      };
    });
  });
}

function parsePrice(raw) {
  if (!raw) return null;
  const cleaned = raw.replace(",", ".").replace(/[^\d.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function calcDiscount(oldPrice, newPrice) {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return null;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

function makeFullUrl(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return ATB_BASE + src;
}

function parseEndDate(raw) {
  if (!raw) return null;
  const date = new Date(raw);
  if (isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
}

module.exports = { scrape };
