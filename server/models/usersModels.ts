
import {db,User} from '../databases/usersDatabase'

export const  getUsersFromModel = async () =>{
    const result = await db.find()
    console.log(result)
    return result
}

export const saveUserToModel = async (user:User) =>{
    const res = await db.create(user)
    return res
}




