import "dotenv/config";

import express from "express";
import cors from "cors";
import passport from "passport";
import route from "./routes/route.js";
import googleRoute from "./routes/googleRoute.js";
import mongoose from "mongoose";
import "./config/googleAuth.js";

import "./jobs/scrape.cron.js";

const app = express();
import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://event-web-ten.vercel.app"
    ],
    credentials: true
  })
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const PORT = process.env.PORT;

const start = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/event");
    await mongoose.connect(process.env.MONGOURl);
    console.log("Database connected successfully");

    // You can call any scraper or test functions here
  } catch (error) {
    console.error("Failed to connect database", error.message);
  }

  app.use("/api", googleRoute);
  app.use(route);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
