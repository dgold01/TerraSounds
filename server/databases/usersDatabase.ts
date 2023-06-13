import { Schema, model, connect } from 'mongoose';
import {User} from "../interfaces/User";

async function main() {
    await connect('mongodb+srv://dlgold:Born1992!@cluster0.gkv7ff4.mongodb.net/?retryWrites=true&w=majority',{
    });
    console.log('connected')
}
main().catch(err => console.log(err));
const schema = new Schema<User>({firstName:String,lastName:String,email:String,password:String,googleId:String});
export const db = model<User>('TerraSoundsUsers',schema)


