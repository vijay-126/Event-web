

import { Router } from "express";


import { getEvents } from "../controller/eventController.js";
import { createTicket } from "../controller/ticketController.js";
import { register, login } from "../controller/userController.js";

import { verifyToken } from "../middleware/authmiddleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/events",getEvents); 
router.get("/dashboard-events", verifyToken, getEvents);
router.post("/tickets", createTicket);




export default router;
