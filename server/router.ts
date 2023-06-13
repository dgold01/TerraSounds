
import express from "express";
import {getEvents,getSavedEvents,saveEvent,deleteEvent} from './controllers/eventsController.js';
import{getUsers,saveUser,findByEmail} from "./controllers/usersController.js";
import { authController } from './middleware/auth.js'
const router = express.Router();
//Event Routes
router.get('/events/:location', getEvents)
router.get('/saved', getSavedEvents );
router.post('/saved', saveEvent);
router.delete('/saved/:_id', deleteEvent);

//User Routes
router.get('/users/exist/:email',findByEmail)
router.get('/users', getUsers);
router.post('/users', saveUser);
router.post('/users/login',authController)

export default router;