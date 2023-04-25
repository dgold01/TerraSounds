import mongoose, { Schema, model, connect } from 'mongoose';
export interface Event {
    title: string;
    address: string;
    venue: string;
    date: string;
    link: string;
    image: string;
    userId: mongoose.Types.ObjectId
}
async function main() {
    await connect('mongodb+srv://dlgold:Born1992!@cluster0.gkv7ff4.mongodb.net/?retryWrites=true&w=majority',{
    });
    console.log('connected')
}
main().catch(err => console.log(err));
const schema = new Schema<Event>({title:String, venue:String,address:String, date:String,link:String,image:String,userId:mongoose.Types.ObjectId})
const db = model<Event>('MusicEvents',schema)
export default db
