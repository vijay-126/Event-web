// scrape what on sydney

import { chromium } from "playwright";
import crypto from "crypto";

const CONCURRENCY = 5;
const LISTING_URL = "https://whatson.cityofsydney.nsw.gov.au/";

function createHash(event) {
  return crypto
    .createHash("md5")
    .update(
      `${event.title}|${event.dateTime}|${event.venueName}|${event.description}`,
    )
    .digest("hex");
}

export async function scrapeWhatsOnSydney() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  });

  const page = await context.newPage();

  // 1️⃣ LOAD LISTING PAGE
  await page.goto(LISTING_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.waitForTimeout(4000);

  // 2️⃣ SCRAPE EVENT LINKS
  const rawEve6nts = await page.evaluate(() => {
    const seen = new Set();
    const events = [];

    document.querySelectorAll("a[href^='/events/']").forEach((a) => {
      const title =
        a.querySelector("h3")?.innerText?.trim() ||
        a.innerText?.split("\n")[0]?.trim();

      const url = a.href;

      if (!title || seen.has(url)) return;
      seen.add(url);

      events.push({
        title,
        originalUrl: url,
      });
    });

    return events;
  });

  console.log("Raw events found:", rawEvents.length);

  // 3️⃣ SCRAPE DETAIL PAGES (BATCHED)
  const events = [];

  for (let i = 0; i < rawEvents.length; i += CONCURRENCY) {
    const batch = rawEvents.slice(i, i + CONCURRENCY);

    const results = await Promise.all(
      batch.map(async (event) => {
        const detailPage = await context.newPage();

        try {
          await detailPage.goto(event.originalUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60000,
          });

          await detailPage.waitForTimeout(1200);

          const details = await detailPage.evaluate(() => {
            const getText = (sel) =>
              document.querySelector(sel)?.innerText?.trim() || "";

            // ---------- DATE & TIME ----------
            let dateTime = getText("time");

            if (!dateTime) {
              const jsonLd = document.querySelector(
                "script[type='application/ld+json']",
              );
              if (jsonLd) {
                try {
                  const data = JSON.parse(jsonLd.innerText);
                  dateTime = data.startDate || "";
                } catch {}
              }
            }

            // ---------- VENUE ----------
            let venueName = getText("[data-testid='venue-name']");
            const venueAddress = getText("address");

            if (!venueName && venueAddress) {
              venueName = venueAddress.split(",")[0]; // fallback
            }

            // ---------- DESCRIPTION ----------
            const description =
              document.querySelector("meta[name='description']")?.content ||
              getText("article p");

            // ---------- CATEGORY (DEDUPED) ----------
            const category = [
              ...new Set(
                Array.from(
                  document.querySelectorAll("a[href*='/categories/']"),
                ).map((el) => el.innerText.trim()),
              ),
            ];

const ogImage =
  document.querySelector("meta[property='og:image']")?.content ||
  document.querySelector("meta[name='twitter:image']")?.content ||
  "";

let imageUrl = ogImage;

// fallback: real <img> inside article
if (!imageUrl) {
  imageUrl =
    Array.from(document.querySelectorAll("article img"))
      .map((img) => img.src)
      .find(
        (src) =>
          src &&
          src.startsWith("http") &&
          !src.includes("logo") &&
          !src.includes("icon") &&
          !src.endsWith(".svg"),
      ) || "";
}


            return {
              dateTime,
              venueName,
              venueAddress,
              description,
              category,
              imageUrl,
            };
          });
          function normalizeUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://whatson.cityofsydney.nsw.gov.au${url}`;
}


          const fullEvent = {
            ...event,
            ...details,
            imageUrl: normalizeUrl(details.imageUrl),
            categories: details.category || [],
            city: "Sydney",
            source: "What's On Sydney",
            lastScrapedAt: new Date(),
            isActive: true,
          };

          fullEvent.lastChangedHash = createHash(fullEvent);

          return fullEvent;
        } catch (err) {
          console.error("Failed:", event.originalUrl);
          return null;
        } finally {
          await detailPage.close();
        }
      }),
    );

    events.push(...results.filter(Boolean));
  }

  console.log("Total events scraped:", events.length);
  console.log(JSON.stringify(events.slice(0, 5), null, 2));

  await browser.close();
  return events;
}

// test scrapper

// import axios from "axios";

// export async function testFetch() {
//   const url = "https://whatson.cityofsydney.nsw.gov.au/";

//   const res = await axios.get(url, {
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
//     },
//   });

//   console.log("STATUS:", res.status);
//   console.log("HTML LENGTH:", res.data.length);
//   console.log(res.data.slice(0, 500)); // preview HTML
// }
