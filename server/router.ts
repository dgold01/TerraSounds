
import express from "express";
import getEvents from './controller';
const router = express.Router();

router.get('/events', getEvents);

export default router;