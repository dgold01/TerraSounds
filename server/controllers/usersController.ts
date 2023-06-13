import {getUsersFromModel, saveUserToModel, findByEmailFromModel} from '../models/usersModels.js';
import {Request, Response} from 'express';


export async function getUsers(req?: Request, res?: Response): Promise<void> {
    try {
        const users = await getUsersFromModel()
        console.log(users)
        if (res) {
            res.status(200);
            console.log(users)
            res.send(users);
        }

    } catch (e) {
        if (res) {
            console.log('e', e);
            res.sendStatus(500);
        }
    }
}

export async function findByEmail(req?: Request, res?: Response): Promise<void> {
    try {
        let email
        let result
        if (req) {
            email = req.params.email
            console.log(email)
            result = await findByEmailFromModel(email)
            console.log(result)
        }
        if (res) {
            res.status(200);
            res.send(result);
        }

    } catch (e) {
        if (res) {
            console.log('e', e);
            res.sendStatus(500);
        }
    }
}


export async function saveUser(req?: Request, res?: Response): Promise<void> {
    console.log('saved')
    try {
        if (req) {
            const user = req.body;
            const savedUser = await saveUserToModel(user)
        }
        if (res) {
            res.status(200);
        }

    } catch (e) {
        if (res) {
            res.sendStatus(500);
        }

    }
}
