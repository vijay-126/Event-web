import Event from "../models/event.js";

/**
 * GET /events
 * Query params:
 * - city
 * - keyword
 * - category
 * - status
 * - active=true|false
 * - from=YYYY-MM-DD
 * - to=YYYY-MM-DD
 * - page (default 1)
 * - limit (default 20)
 */
export async function getEvents(req, res) {
  try {
    const {
      city,
      keyword,
      category,
      status,
      active = "true",
      from,
      to,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // ✅ Active filter
    if (active !== undefined) query.isActive = active === "true";

    // ✅ City filter
    if (city) query.city = city;

    // ✅ Status filter
    if (status) query.status = new RegExp(`^${status}$`, "i");

    // ✅ Category filter (multiple categories)
    if (category) {
      const categories = category.split(",");
      query.categories = { $in: categories.map(c => new RegExp(`^${c}$`, "i")) };
    }

    // ✅ Keyword filter (title, venue, description)
    if (keyword) {
      const kw = keyword.trim();
      query.$or = [
        { title: { $regex: kw, $options: "i" } },
        { venue: { $regex: kw, $options: "i" } },
        { description: { $regex: kw, $options: "i" } },
      ];
    }

    // ✅ Date range filter
    if (from || to) {
      const dateQuery = {};
      if (from) {
        const fromDate = new Date(from);
        if (!isNaN(fromDate)) dateQuery.$gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to);
        if (!isNaN(toDate)) dateQuery.$lte = toDate;
      }
      if (Object.keys(dateQuery).length > 0) query.dateTime = dateQuery;
    }

    // ✅ Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    console.log("MongoDB query:", query);

    const [events, total] = await Promise.all([
      Event.find(query).sort({ dateTime: 1 }).skip(skip).limit(limitNum),
      Event.countDocuments(query),
    ]);

    res.json({
      total,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
      limit: limitNum,
      results: events.length,
      events,
    });
  } catch (err) {
    console.error("GET /events error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
