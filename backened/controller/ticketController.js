import Ticket from "../models/ticket.js";

export async function createTicket(req, res) {
  try {
    const { email, consent, eventId, eventUrl } = req.body;
console.log(req.body);
    if (!email || !consent || !eventId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    

    const ticket = new Ticket({
         email,
      consent,
      eventId,
      eventUrl,
    })

    await ticket.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Create ticket error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
