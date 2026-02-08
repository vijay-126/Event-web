import cron from "node-cron";
import { runCityOfSydneyScraper } from "./runScrapers.js";

cron.schedule("0 0 */6 * * *", async () => {

  console.log("⏰ Cron: City of Sydney scraper started");

  try {
    await runCityOfSydneyScraper();
    console.log("✅ Cron: scraper finished");
  } catch (err) {
    console.error("❌ Cron failed:", err.message);
  }
});

// "0 0 */6 * * *"