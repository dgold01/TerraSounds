import getEventsFromApi from './model'
import { Request, Response } from 'express';
import type { GoogleEventsParameters } from 'serpapi';

export default async function getEvents(req:Request,res:Response) : Promise<void> {
    try {
        const events = await getEventsFromApi();
        res.status(200);
        console.log(events)
        res.send(events);
    } catch (e) {
        console.log('e', e);
        res.sendStatus(500);
    }
}