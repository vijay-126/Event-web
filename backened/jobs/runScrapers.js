import { scrapeWhatsOnSydney } from "../scrapper/WhatOnSydneyscraper.js";
import { syncEvents } from "../services/serviceEvent.js";

export async function runCityOfSydneyScraper() {
  console.log("🔍 Scraping City of Sydney events...");

  const events = await scrapeWhatsOnSydney();

  console.log(`📦 ${events.length} events scraped`);

  await syncEvents(events, "What's On Sydney");

  console.log("✅ Sync completed");
}
