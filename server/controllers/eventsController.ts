import {getEventsFromApi, getSavedEventsFromModel, saveEventToModel, deleteEventFromModel} from '../models/eventsModel.js';
import { Request, Response } from 'express';
import mongoose from "mongoose";

export async function getEvents(req:Request,res:Response) : Promise<void> {
    try {
        const events = await getEventsFromApi(req.params.location);
        res.status(200);
        res.send(events);
    } catch (e) {
        console.log('e', e);
        res.sendStatus(500);
    }
}

export async function getSavedEvents(req?:Request,res?:Response) : Promise<void> {
    try {
        const events = await getSavedEventsFromModel();
        if(res){
            res.status(200);
            console.log(events)
            res.send(events);
        }
        
    } catch (e) {
        if(res){
            console.log('e', e);
            res.sendStatus(500);
        }
    }
}
export async function saveEvent(req?:Request,res?:Response) : Promise<void> {
    console.log('saved')
    try {
        if(req){
        const event = req.body;
        const savedEvent = await saveEventToModel(event)}
        if(res){
            res.status(200);
        }
       
    } catch (e) {
        if(res){
            res.sendStatus(500); 
        }
      
    }
} 
export async function deleteEvent(req?:Request,res?:Response) : Promise<void> {
    console.log('deleted')
    try {
        if(req){
        const _id=  req.params._id
        console.log(_id)
        await deleteEventFromModel(_id)}
        if(res) {
            res.status(201)
            res.json({message:'deleted'})}

    } catch (e) {
        console.log('e', e);

    }
}