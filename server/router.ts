
import express from "express";
import {getEvents,getSavedEvents,saveEvent,deleteEvent} from './controllers/eventsController';
import{getUsers,saveUser} from "./controllers/usersController";

const router = express.Router();
//Event Routes
router.get('/events/:location', getEvents)
router.get('/saved', getSavedEvents );
router.post('/saved', saveEvent);
router.delete('/saved/:_id', deleteEvent);

//User Routes
router.get('/users', getUsers);
router.post('/users', saveUser);

export default router;