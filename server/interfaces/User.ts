import mongoose from "mongoose";
export interface User {
    // flat data fields
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    id?: mongoose.Types.ObjectId;
    googleId?: string;
}
