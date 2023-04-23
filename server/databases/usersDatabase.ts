import { Schema, model, connect } from 'mongoose';
export interface User {
    name: string;
    email:string;
    password:string;
}
async function main() {
    await connect('mongodb+srv://dlgold:Born1992!@cluster0.gkv7ff4.mongodb.net/?retryWrites=true&w=majority',{
    });
    console.log('connected')
}
main().catch(err => console.log(err));
const schema = new Schema<User>({name:String, email:String,password:String});
export const db = model<User>('TerraSoundsUsers',schema)


