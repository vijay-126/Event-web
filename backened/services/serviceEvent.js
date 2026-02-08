import Event from "../models/event.js";

export async function syncEvents(scrapedEvents, source) {
  // 1️⃣ Mark all existing events inactive
  await Event.updateMany(
    { source },
    { isActive: false, status: "inactive" }
  );

  for (const event of scrapedEvents) {
    const existing = await Event.findOne({
      originalUrl: event.originalUrl,
    });

    // 2️⃣ NEW
    if (!existing) {
      await Event.create({
        ...event,
        status: "new",
        isActive: true,
      });
      continue;
    }

await Event.findOneAndUpdate(
  { originalUrl: event.originalUrl },
  { ...event, isActive: true, status: "new" },
  { upsert: true, new: true }
);


    // 3️⃣ UPDATED
    if (existing.lastChangedHash !== event.lastChangedHash) {
      await Event.updateOne(
        { _id: existing._id },
        {
          ...event,
          status: "updated",
          isActive: true,
        }
      );
      continue;
    }

    // 4️⃣ UNCHANGED (FIXED)
    await Event.updateOne(
      { _id: existing._id },
      {
        lastScrapedAt: event.lastScrapedAt,
        isActive: true,
        status: "active",
      }
    );
  }
}
