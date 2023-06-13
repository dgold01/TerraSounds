import { Profile } from 'passport-google-oauth20';
import {db} from '../databases/usersDatabase.js'
import { User } from '../interfaces/User';
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
export const  getUsersFromModel = async () =>{
    const result = await db.find()
    console.log(result)
    return result
}

export const saveUserToModel = async (user:User) =>{
    const res = await db.create(user)
    return res
}
export async function loginUser(email: User['email'], password: User['password']) {
    // Find the user with the specified email
    const user = await db.findOne({email:email})

    // If no user is found with the email, return null
    if (!user) {
        return null;
    }

    // Verify that the password matches the stored password hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, return null
    if (!passwordMatch) {
        return null;
    }

    // If the credentials are valid, return the user object
    return user;
}
export const findByEmailFromModel = async (email:string) =>{
    const res = await db.findOne({email:email})
    console.log(res)
    return res
}

export const findByIdFromModel = async (_id:mongoose.Types.ObjectId) =>{
    const res = await db.findById(_id)
    return res
}

export async function createUserFromGoogleProfile(profile: Profile) {
    const email =
        profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    const userData = {
        email: email || '',
        password: '',
        firstName: profile._json.given_name || '',
        lastName: profile._json.family_name || '',
        googleId: profile.id,
    };

    const createdUser = await db.create({
        data: userData,
    });

    return createdUser;
}


