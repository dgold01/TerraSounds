import {getUsersFromModel,saveUserToModel} from '../models/usersModels';
import { Request, Response } from 'express';



export async function getUsers(req?:Request,res?:Response) : Promise<void> {
    try {
        const users = await getUsersFromModel()
        console.log(users)
        if(res){
            res.status(200);
            console.log(users)
            res.send(users);
        }

    } catch (e) {
        if(res){
            console.log('e', e);
            res.sendStatus(500);
        }
    }
}
export async function saveUser(req?:Request,res?:Response) : Promise<void> {
    console.log('saved')
    try {
        if(req){
            const user = req.body;
            const savedUser = await saveUserToModel(user)}
        if(res){
            res.status(200);
        }

    } catch (e) {
        if(res){
            res.sendStatus(500);
        }

    }
}
