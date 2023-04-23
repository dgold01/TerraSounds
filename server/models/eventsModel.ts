
import {getJson} from 'serpapi'
import db from '../databases/eventsDatabase'
const ApiKey = '095fef8efef187889fe4c4616b05491c1366a338c170119bd3da3e949b5455ed'



const params = {
    q: '',
    google_domain: "google.com",
    api_key: ApiKey,
} 
export const getEventsFromApi = async (location:string) =>{
    console.log(location)
    params.q = 'Music Events in '+location
    console.log(params)
    const result = await getJson('google_events',params)
    console.log(result)
    return result 
}

export const  getSavedEventsFromModel = async () =>{
    const result = await db.find()
    return result
}

export const saveEventToModel = async (event:Event) =>{
    const res = await db.create(event)
    return res
}

export const deleteEventFromModel = async (_id:string) =>{
    console.log('etst')
    const res = db.findByIdAndDelete(_id)
    return res
}


