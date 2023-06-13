
import {getJson} from 'serpapi'
import db from '../databases/eventsDatabase.js'
const ApiKey = '39874278852d0eaf15097f5672066c23c747e110757533c71c9931ee242e3cac'



const params = {
    q: '',
    google_domain: "google.com",
    api_key: ApiKey,
} 
export const getEventsFromApi = async (location:string) =>{
    console.log(location)
    try{
        params.q = 'Music Events in '+location
        console.log(params)
        const result = await getJson('google_events',params)
        console.log(result['events_results'] + '!!!!!!!')
        if(!result['events_results']){
            console.log('YESERROR')
            throw Error
        }
        else return result
    }
    catch(error){
        params.q = 'Music Events in '+location
        console.log(params)
        const result = await getJson('google',params)
        console.log(result['events_results'])
        console.log('we are reutning')
        return result['events_results']
    }
    
    
}

export const  getSavedEventsFromModel = async () =>{
    const result = await db.find()
    return result
}

export const saveEventToModel = async (event:Event) =>{
    console.log(event)
    const res = await db.create(event)
    return res
}

export const deleteEventFromModel = async (_id:string) =>{
    console.log('etst')
    const res = db.findByIdAndDelete(_id)
    return res
}


